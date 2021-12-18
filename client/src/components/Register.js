import {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

//Register view. Message is used to inform user from invalid input. 
//When/If user is logged in they are redirected to main page

function Register({jwt, setJwt, setUser}) {
    const [userData, setUserData] = useState({})
    const [message, setMessage] = useState("")
    const submit = (e) => {
        e.preventDefault()
        fetch("/users/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    setMessage("Invalid username or password! Username has to be between 3 and 20 characters and password has to be atleast 8 characters.")
                }
                else if (data.message) {
                    console.log(data.message)
                    setMessage(data.message);
                } else {
                let token = Cookies.get('jwt')
                if(token) {
                    setJwt(token)
                    setUser(JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()))
                }}
            })
    }
    const onChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    return (
        <div>
            {jwt ? <Navigate to="/"/> :
            <><h2>Register</h2>
            <p>{message}</p>
                <form onSubmit={submit} onChange={onChange}>
                    <input type="text" id="username" name="username" placeholder="Username"></input>
                    <input type="password" id="password" name="password" placeholder="Password"></input>
                    <input type="submit" id="submit"/>
                </form>
                <Link to="/">Return</Link>
            </>
            }
        </div>
    )
}

export default Register