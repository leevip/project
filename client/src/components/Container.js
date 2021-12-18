import React from 'react'
import Login from './Login'
import Posts from './Posts'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';


function Container({jwt, setJwt, user, setUser}) {
    const logOut = () => {
        Cookies.remove('jwt');
        setJwt("");
        setUser("");
    }
    return (
        <div>
            {!user?.id?.length > 0 ?
                <>
                    <h2>Login</h2>
                    <Login setJwt={setJwt} setUser={setUser}/>
                    <Link to="/register">Register</Link>
                </>
                :
                <button onClick={logOut}>Log out</button>
            }
            <Posts user={user} jwt={jwt}/>
        </div>
    )
}

export default Container