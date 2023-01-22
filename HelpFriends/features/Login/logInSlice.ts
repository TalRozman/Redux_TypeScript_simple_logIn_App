import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { credential } from '../../env';
import { addUser, sendCredentials } from './logInAPI';

interface LoginState {
    isLoggedIn?: boolean;
    userName?:string;
    status?: 'Access Denied'|'Access Granted'|'Idle'|'User Existed'
}

const initialState: LoginState = {
    isLoggedIn: false,
    status:'Idle'
};

export const checkCredentialsAsync = createAsyncThunk(
    'login/sendCredentials',
    async (credentials:credential)=>
    {
        console.log('async', credentials)
        const res = await sendCredentials(credentials);
        return res.data;
    }
)

export const addUserAsync = createAsyncThunk(
    'login/addUser',
    async (credentials:credential)=>
    {
        const res = await addUser(credentials);
        return res.data;
    }
)

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: state => {
            state.isLoggedIn = false;
        }
    },
    extraReducers:(builder)=>
    {
        builder
        .addCase(checkCredentialsAsync.fulfilled,(state,action:PayloadAction<number>)=>
        {
            if (action.payload === 401)
            {
                state.status = 'Access Denied'
            }
            else if (action.payload === 200)
            {
            state.isLoggedIn = true;
            state.status = 'Access Granted'
            }
            console.log(action.payload)
        })
        .addCase(addUserAsync.fulfilled,(state,action:PayloadAction<number>)=>
        {
            if (action.payload === 401){
                state.status = 'User Existed'
            }
            else if (action.payload === 200){
                state.status = 'Access Granted'
            }
        })
    }
});

export const { logout} = loginSlice.actions;
export const selectStatus = (state:RootState) => state.login.status;
export default loginSlice.reducer;
