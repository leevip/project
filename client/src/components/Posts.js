import {useState, useEffect} from 'react';
import AddPost from './AddPost';
import ListPost from './ListPost';

const Posts = ({user, jwt}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        let mounted = true;
        async function getData(){
            if(mounted){
                setPosts([])
                fetch("/api/posts")
                .then(respose => respose.json())
                .then(data => {
                    setPosts(data.map(item => ({
                        id: item.post_id,
                        author: item.author,
                        content: item.content
                    }),))
                })
            }
        }
        getData();

        return () => {
            mounted = false;
        };
    }, [])

    return (
        <div>
            {jwt ? <AddPost jwt={jwt} user={user} setPosts={setPosts} posts={posts}/>:<p>Login to post</p>}
            {posts.map((post) => (
                 <ListPost key={post.id} post={post}/>
            ))}
        </div>
    )
}

export default Posts