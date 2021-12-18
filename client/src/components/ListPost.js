
//A post shown on the frontpage of the app and user's post history. 
//Put in own component to make the posts clickable easily.

function ListPost ({post}){
    return (
        <div>
            <div onClick={e => window.location.href=`/post/${post.id}`} className="code-block"><h2>{post.author}</h2>{post.content}</div>
        </div>
    )
}

export default ListPost