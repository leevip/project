import {useState} from 'react'

//New comment form

function AddComment({jwt, user, post, setComments, comments}) {
    const [newComment, setNewComment] = useState({})

    const submit = (e) => {
        e.preventDefault()
        fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": jwt
            },
            body: JSON.stringify(newComment),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data=> {
                setComments([...comments, {
                    id: data.comment_id,
                    author: data.author,
                    content: data.content,
                    likes: data.likes,
                    post: data.post
                }])
            })
    }
    const onChange = (e) => {
        setNewComment({author: user.username, post: post.id, content: e.target.value})
    }
    return (
        <div>
            <form onSubmit={submit} onChange={onChange}>
                <input type="text" id="content" name="content" placeholder="New comment"></input>
                <input type="submit" id="submit"/>
            </form>
        </div>
    )
}

export default AddComment