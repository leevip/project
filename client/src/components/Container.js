import React from 'react'
import Posts from './Posts'


function Container({jwt, setJwt, user, setUser}) {
    
    return (
        <div>
            <h1>Welcome!</h1>
            <Posts user={user} jwt={jwt}/>
        </div>
    )
}

export default Container