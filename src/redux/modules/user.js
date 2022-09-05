// Redux import
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../shared/api';

export const emailDupCheckThunk = createAsyncThunk(
  'user/emailDupCheck',
  async (payload, thunkAPI) => {
    const resData = await api
      .get(`member/checkemail?email=${payload}` )
      .then((res) => res.data.success)
      .catch((error) => console.err(error));
    return thunkAPI.fulfillWithValue(resData);
  }
);

export const nickNameDupCheckThunk = createAsyncThunk(
  'user/nicknameDupCheck',
  async (payload, thunkAPI) => {
    const resData = await api
      .get(`/member/checknick?nick=${payload}`)
      .then((res) => res.data)
      .catch((error) =>error.response.data);

    return thunkAPI.fulfillWithValue(resData);
  }
);

export const addUserThunk = createAsyncThunk(
  'use/addUser',
  async (payload, thunkAPI) => {
    const resData = await api
      .post(`/member/signup`, payload)
      console.log(payload)
      .then((res) => res.data);
      console.log(resData)
      .catch((error) => console.err(error));
      console.log(console.err)
    return thunkAPI.fulfillWithValue(resData);
  }
);

export const signUserThunk = createAsyncThunk(
  'user/signUser',
  async (payload, thunkAPI) => {
    const resData = await api
      .post(`/member/login`, payload)
      .then((res) => res)
      .catch((err) => console.err(err));
    window.sessionStorage.setItem(
      'authorization',
      resData.headers['authorization'].split(' ')[1]
    );
    window.sessionStorage.setItem(
      'refresh-token',
      resData.headers['refresh-token']
    );

    return thunkAPI.fulfillWithValue(resData.data.success);
  }
);

export const kakaoAuthThunk = createAsyncThunk(
  'user/kakaoLogin',
  async (payload, thunkAPI) => {
    const resData = await api
      .get(`/member/kakao?code=${payload.code}`)
      .then((res) => res);
      console.log(resData)
    window.sessionStorage.setItem(
      'authorization',
      resData.headers['authorization'].split(' ')[1]
    );
    window.sessionStorage.setItem(
      'refresh-token',
      resData.headers['refresh-token']
    );
    return thunkAPI.fulfillWithValue(resData.data);
  }
);


const initialState = {
  is_login: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    headerAction: (state, action) => {
      state.is_login = action.payload.is_login;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(kakaoAuthThunk.fulfilled, (state, action) => {
      state.is_login = action.payload;
    });
    builder.addCase(signUserThunk.fulfilled, (state, action) => {
      state.is_login = action.payload;
    });
  },
});

export const { headerAction } = userSlice.actions;
export default userSlice.reducer;
