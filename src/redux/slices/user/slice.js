import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  userMeta: null,
  macAddress: null,
  rolesdata:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserMeta: (state, action) => {
      state.userMeta = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setMacAddress: (state, action) => {
      state.macAddress = action.payload;
    },
    setRolesData: (state, action) => {
      console.log("=payload data=====>>>",action.payload);
      state.rolesdata = action.payload;
    },
  },
});

export default userSlice;