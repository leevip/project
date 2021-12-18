
function ListPost ({post}){
    return (
        <div>
            <div onClick={e => window.location.href=`/post/${post.id}`} className="code-block"><h2>{post.author}</h2>{post.content}</div>
        </div>
    )
}

export default ListPost