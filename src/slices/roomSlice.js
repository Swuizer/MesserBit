import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  room: null,
  rooms: [],
  editRoom: false,
  owners: [],
  // paymentLoading: false,
}

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setRoom: (state, action) => {
      state.room = action.payload
    },
    setRooms: (state, action) => {
      state.rooms = action.payload
    },
    setEditRoom: (state, action) => {
      state.editRoom = action.payload
    },
    resetRoomState: (state) => {
      state.step = 1
      state.room = null
      state.editRoom = false
    },
    setOwners: (state, action) => {
      state.owners = action.payload
    },
  },
})

export const {
  setStep,
  setRoom,
  setRooms,
  setEditRoom,
  resetRoomState,
  setOwners
} = roomSlice.actions

export default roomSlice.reducer