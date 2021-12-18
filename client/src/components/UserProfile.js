import {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import ListPost from './ListPost';


function UserProfile() {
    const [posts, setPosts] = useState([])
    let {user} = useParams()

    useEffect(() => {
        let mounted = true;
        async function getData(){
            if(mounted){
                setPosts([])
                fetch(`/api/posts/${user}`)
                .then(respose => respose.json())
                .then(data => {
                    if(data){
                    setPosts(data.map(item => ({
                        id: item.post_id,
                        author: item.author,
                        content: item.content
                    }),))
                }
                })
            }
        }
        getData();

        return () => {
            mounted = false;
        };
    }, [user])

    return (
        <div>
            <Link to="/">Back</Link>
            <h2>{user}</h2>
            {posts.map((post) => (
                 <ListPost key={post.id} post={post}/>
            ))}
        </div>
    )
}

export default UserProfile