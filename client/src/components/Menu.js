import React from 'react'
import Login from './Login'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

function Menu({jwt, setJwt, user, setUser}) {
    const logOut = () => {
        Cookies.remove('jwt');
        setJwt("");
        setUser("");
    }
    return (
        <div className='menu'>
            {!user?.id?.length > 0 ?
                <>
                    <p>Login</p>
                    <Login setJwt={setJwt} setUser={setUser}/>
                    <Link to="/register">Register</Link>
                </>
                :
                <button onClick={logOut}>Log out</button>
            }
        </div>
    )
}

export default Menu