import { configureStore } from '@reduxjs/toolkit'
import formReducer from './googleGenerated/formSlice'



 const store = configureStore({
  reducer: {
   form: formReducer,

  },
})


export default store;