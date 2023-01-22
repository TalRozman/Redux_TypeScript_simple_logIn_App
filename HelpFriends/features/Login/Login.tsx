import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { credential } from '../../env';
import { logout, selectStatus, checkCredentialsAsync, addUserAsync } from './logInSlice';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);
    const status = useSelector(selectStatus);
    const [uName, setuName] = useState('')
    const [password, setpass] = useState('')

    const login = () => {
        let credentials = new credential(uName, password);
        dispatch(checkCredentialsAsync(credentials))
    }

    const addUser = () => {
        let credentials = new credential(uName, password);
        (uName !== "" && password !== "") && dispatch(addUserAsync(credentials))
    }

    return (
        <div>
            {isLoggedIn ? (
                <>
                    <p>Welcome, {uName}!</p>
                    <button onClick={() => { dispatch(logout()); }}>Logout</button>
                </>
            ) : (
                <>
                    <p>You are not logged in.</p>
                    <form onSubmit={(e) => { e.currentTarget.reset(); e.preventDefault() }}>
                        User Name - <input onKeyUp={(e) => { setuName(e.currentTarget.value) }} /><br />Password - <input type={'password'} onKeyUp={(e) => setpass(e.currentTarget.value)} autoComplete={'false'} autoSave="false" /><br />
                        {(uName === "" || password === "") ? <p>Please fill all fields</p> : <><button onClick={() => login()}>Login</button><button onClick={() => addUser()}>Sign Up!</button></>}
                        {status === 'Access Denied' ? <p>Incorrect password or user name.<br />Please try again.</p> : ""}
                        {status === 'User Existed' && <p>User already exist! please log in</p>}
                    </form>
                    </>
                
            )}
        </div>
    );
};

export default Login;
