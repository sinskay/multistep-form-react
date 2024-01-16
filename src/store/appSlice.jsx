import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    step: 1,
    animations: {
      hidden: {
          scale: 0.8,
          opacity: 0,
          x: 100,
      },
      visible: {
          scale: 1,
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            type: 'spring',
            damping: 10,
            stiffness: 100,
          }
      }
  }
  
}


const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
      next: (state)=>{
        state.step += 1; 
      },
      back: (state)=>{
        state.step -= 1; 
      }
    }
});


export const { next, back } = appSlice.actions 
export default appSlice.reducer;