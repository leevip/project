import {useState} from 'react'

//Form to add a new post

function AddPost({jwt, user, setPosts, posts}) {
    const [newPost, setNewPost] = useState({})

    const submit = (e) => {
        e.preventDefault()
        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": jwt
            },
            body: JSON.stringify(newPost),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data=> {
                setPosts([...posts, {
                    id: data.post_id,
                    author: data.author,
                    content: data.content,
                    likes: data.likes
                }])
            })
    }

    const onChange = (e) => {
        setNewPost({author: user.username, content: e.target.value})
    }

    return (
        <div className='new-post'>
            <form onSubmit={submit} onChange={onChange}>
                <textarea className='post-input' id="content" name="content" placeholder="New post"></textarea>
                <input type="submit" id="submit"/>
            </form>
        </div>
    )
}

export default AddPost