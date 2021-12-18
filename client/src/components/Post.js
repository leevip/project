import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import AddComment from './AddComment';
import Comment from './Comment';

//Post when opened by clicking on frontpage or users post history

function Post ({user, jwt}){
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    let {postId} = useParams();


    useEffect(() => {
        let mounted = true;
        async function getData(){
            if(mounted){
                
                setPost({})
                fetch(`/api/post/${postId}`)
                    .then(response => response.json())
                    .then(data => {
                        setPost({
                            id: data.post_id,
                            author: data.author,
                            content: data.content
                        })
                    })

                setComments([])
                fetch(`/api/comments/${postId}`)
                .then(respose => respose.json())
                .then(data => {
                    setComments(data.map(item => ({
                        id: item.comment_id,
                        author: item.author,
                        content: item.content,
                        post: item.post
                    }),))
                })
            }
        }
        getData();

        return () => {
            mounted = false;
        };
    },[postId])

    return (
        <div>
            <Link to="/">Back</Link>
            <div className="code-block"><h3 onClick={e => window.location.href=`/user/${post.author}`}>{post.author}</h3>{post.content}</div>
            <div className="comments">
                <p>Comments</p>
                {jwt && <AddComment jwt={jwt} user={user} post={post} setComments={setComments} comments={comments}/>}
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    )
}

export default Post
