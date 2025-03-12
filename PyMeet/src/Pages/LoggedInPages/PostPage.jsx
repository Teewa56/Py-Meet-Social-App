import Post from "../../Components/Post";
import { useParams } from "react-router-dom";
import BackButton from '../../Components/BackButton';
import Comment from "../../Components/Comment";
import { useContext, useState, /*useEffect*/ } from "react";
import Loading from "../../Components/Loading";
import { CommentContext } from "../../Context/commentContext";

const PostPage = () =>{

    const [comment, setComment] = useState("");
    const [commented, setCommented] = useState(false);
    const { MakeComment, error, loading, EditComment, /*canEdit*/} = useContext(CommentContext);
    const postId = useParams();
    const storedUser = localStorage.getItem('user');
    const commenterId = storedUser._id;
    const editerId = storedUser._id;
    const commentId = postId.commentId;

    /*useEffect(() => {
        const fetchComment = async () => {
            if(canEdit){
                try {
                    
                } catch (error) {
                    console.log(error.message)
                }
            }
        };
        fetchComment();
    }, [commentId]);*/

    const handleSend = async() => {
        const res = await MakeComment(postId, commenterId, comment);
        console.log(res.data);
        setCommented(true);
    }

    const handleEdit = async () => {
        const res = await EditComment(editerId, commentId, comment);
        console.log(res);
    }

    if(loading) return <Loading />

    return(
        <>  
            <div>
                <BackButton />
                {error && <p>{error}</p> }
                <Post post={postId} />
                <Comment comment={commentId} />
                <div>
                    <input type="text"
                    placeholder="Enter your comment here" 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}/>
                    <button onClick={commented === true ? handleEdit : handleSend} >{commented === true ? "Edit" : "send"}</button>
                </div>
            </div>
        </>
    )
}

export default PostPage;