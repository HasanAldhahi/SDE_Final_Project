// store.js
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
// Define the initial state and the slice using createSlice
// import { useDispatch, useSelector } from "react-redux";



const formSlice = createSlice({
  name: 'form',
  initialState: {
    dataList: [],
    status: 'idle',
    divID: null,
    targetImage: ""
  },

  reducers: {

    setClickedDiv: (state , action) => {
    state.divID = action.payload
  },
  setTargetImage: (state, action) => {
    state.targetImage = action.payload
  }
},

  extraReducers: (builder) => {
    builder
    // for fetchin the form
      .addCase(fetchform.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dataList = action.payload;
      })
      .addCase(fetchform.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchform.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      
      // for fetching the data set

  },
});
// Create an async thunk using createAsyncThunk
export const fetchform = createAsyncThunk('form/fetchform', async () => {
    return axios.get("http://localhost:8080/api/v1/post")
    .then(res=>res.data);
});


export const  {setClickedDiv, setTargetImage} =  formSlice.actions
export default formSlice.reducer


  