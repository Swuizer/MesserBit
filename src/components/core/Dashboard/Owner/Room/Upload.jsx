import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import "video-react/dist/video-react.css"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  multiple = false, // Added support for multiple file uploads
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(
    viewData ? viewData : editData ? editData : []
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      const newFiles = multiple
        ? [...selectedFiles, ...acceptedFiles]
        : [acceptedFiles[0]];

      previewFiles(newFiles);
      setSelectedFiles(newFiles); 
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    multiple: multiple, // Allow multiple uploads if multiple is true
  });

  // const previewFiles = (files) => {
  //   const newPreviewSources = files.map((file) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setPreviewSources((prev) => [...prev, reader.result]);
  //     };
  //   });
  // };

  const previewFiles = (files) => {
    // Clear the previous preview sources
    setPreviewSources([]); 
  
    const newPreviewSources = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        newPreviewSources.push(reader.result);
  
        // Only set preview sources when all images are loaded
        if (newPreviewSources.length === files.length) {
          setPreviewSources(newPreviewSources);
        }
      };
    });
  };
  

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFiles);
  }, [selectedFiles, setValue, name]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        {...getRootProps()}
      >
        <input {...getInputProps()} ref={inputRef} />
        {previewSources.length > 0 ? (
          <div className="flex flex-wrap gap-4 p-6">
            {previewSources.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="h-24 w-24 rounded-md object-cover"
              />
            ))}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSources([]);
                  setSelectedFiles([]);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop {multiple ? "images" : "an image"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
