import React, { useState } from "react"
//import { useLogin } from "../hooks/useLogin"
import Cookie from 'universal-cookie'
import axios from 'axios'
import { Box, TextField } from '@mui/material'


// import "./Login.scss"

const cookie = new Cookie()

const Login = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    // const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        axios.post('http://localhost:8080/auth/login', {
            username: username,
            password: password
        }).then(function (response) {
            const { token, user_id } = response.data
            cookie.set('token', token)
            cookie.set('user_id', user_id)
            window.location.reload()
        }).catch(function (error) {
            console.log(error);
        });

        //window.location.reload()
        // await login(email, password)
        //navigate("/")
    }

    return (
        <Box
            className="rounded-2xl shadow-2xl my-auto mx-auto w-8/12 max-lg:w-10/12 max-md:w-full"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className="flex flex-col items-center">
                <h1 className="text-2xl my-10 font-extrabold">Đăng nhập</h1>
                <TextField onChange={e => setUserName(e.target.value)} style={{ width: "80%", margin: "16px 0px" }} id="outlined-required" label="Tài khoản" />
                <TextField onChange={e => setPassword(e.target.value)} style={{ width: "80%", margin: "16px 0px" }} id="outlined-password-input" label="Mật khẩu" type="password" autoComplete="current-password" />
                <button onClick={handleSubmit} style={{ width: "80%", margin: "50px 0px" }} className="text-white bg-green-500 py-3 rounded-md">Đăng nhập</button>
            </div>

        </Box>
    )
}

export default Login