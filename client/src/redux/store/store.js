import { configureStore } from '@reduxjs/toolkit'
import food from "../reducer/reducer.js"

const store = configureStore({
   reducer: {
      food
   }
})

export default store;
