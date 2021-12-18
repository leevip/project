import { useState } from 'react'
import Cookies from 'js-cookie'

function Login ({setJwt, setUser}) {
    const [userData, setUserData] = useState({})
    const [message, setMessage] = useState("")
    const login = (e) => {
        e.preventDefault()
        fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setMessage(data.message)
                }
                let token = Cookies.get('jwt')
                if(token) {
                    setJwt(token)
                    setUser(JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()))
                }
            })
    }
    const onChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <p>{message}</p>
            <form onSubmit={login} onChange={onChange}>
                <input type="text" id="username" name="username" placeholder="Username"></input>
                <input type="password" id="password" name="password" placeholder="Password"></input>
                <input type="submit" id="submit"/>
            </form>
        </div>
    )
}

export default Login