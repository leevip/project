import React from 'react'

//A comment show on a post

function Comment ({comment}) {
    return (
        <div>
            <div onClick={e => window.location.href=`/user/${comment.author}`} className="username">{comment.author}</div>
            <p> {comment.content}</p>
        </div>
    )
}

export default Comment