import { configureStore } from '@reduxjs/toolkit'
import dogs from "../reducer"

const store = configureStore({
   reducer: {
      dogs
   }
})

export default store;
