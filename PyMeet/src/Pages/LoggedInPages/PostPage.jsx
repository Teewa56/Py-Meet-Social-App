import { useParams } from "react-router-dom";
import BackButton from "../../Components/BackButton";
import { useContext, useState, useEffect } from "react";
import Loading from "../../Components/Loading";
import { CommentContext } from "../../Context/commentContext";
import { getPostById, getUserProfile, getCommentById } from "../../Services/api";

const PostPage = () => {
    const [comment, setComment] = useState("");
    const [commented, setCommented] = useState(false);
    const { MakeComment, EditComment, error, loading } = useContext(CommentContext);
    const { postId, commentId } = useParams();
    const [post, setPost] = useState(null);
    const [author, setAuthor] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const commenterId = storedUser ? storedUser._id : null;

    useEffect(() => {
        if (commentId) {
            setCommented(true);
        }
    }, [commentId]);

    useEffect(() => {
        const fetchPostData = async () => {
            setIsLoading(true);
            try {
                const res = await getPostById(postId);
                setPost(res.data);
                const postAuthor = res.data.author[0];

                const authorRes = await getUserProfile(postAuthor);
                setAuthor(authorRes.data);
                
                if (res.data.comments?.length > 0) {
                    const commentsData = await Promise.all(
                        res.data.comments.map(async (commentId) => {
                            const commentRes = await getCommentById(commentId);
                            const commentData = commentRes.data;

                            if (!commentData) return null;

                            // Fetch commenter details
                            const commenterRes = await getUserProfile(commentData.commenter);
                            commentData.commenter = commenterRes.data;

                            return commentData;
                        })
                    );
                    setComments(commentsData.filter(Boolean)); // Remove null values
                } else {
                    setComments([]);
                }
            } catch (e) {
                console.error("Error fetching post, author, or comments:", e);
            }
            setIsLoading(false);
        };
        fetchPostData();
    }, [postId]);

    const handleSend = async () => {
        if (!comment.trim()) return;
        try {
            const res = await MakeComment(postId, commenterId, comment);
            if (res) {
                setComment("");
                setCommented(true);
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleEdit = async () => {
        if (!comment.trim()) return;
        try {
            const res = await EditComment(commentId, commenterId, comment);
            if (res) {
                console.log("Comment edited:", res);
            }
        } catch (error) {
            console.error("Error editing comment:", error);
        }
    };

    if (loading || isLoading) return <Loading />;

    return (
        <div className="p-4">
            <BackButton />
            {error && <p className="text-red-500">{error}</p>}
            
            {post ? (
                <div className="border border-gray-300 rounded-lg p-4 bg-white text-black shadow-lg">
                    <div className="flex items-center mb-4">
                        <img 
                            className="rounded-full w-12 h-12 mr-4 object-cover" 
                            src={author?.profilePic || "/default-avatar.png"} 
                            alt={author?.userName || "Unknown"} 
                        />
                        <div>
                            <p className="font-bold">{author?.userName || "Unknown"}</p>
                        </div>
                    </div>
                    <div className="mb-4">
                        {post.postText && <p className="text-gray-800">{post.postText}</p>}
                        {post.postImage && (
                            <div className="mt-4">
                                <img className="w-full post-h rounded-md object-cover" src={post.postImage} alt="Post" />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between mt-4 text-gray-600">
                        <p>❤️ {post.postLikes?.length || 0} Likes</p>
                        <p>💬 {post.comments?.length || 0} Comments</p>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">{post.timeStamp}</p>
                </div>
            ) : <Loading />}

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                {comments.length > 0 ? comments.map((comment) => (
                    <div key={comment._id} className="border rounded-lg p-4 mb-2 bg-gray-100">
                        <div className="flex items-center mb-2">
                            <img 
                                src={comment.commenter?.profilePic || "/default-avatar.png"} 
                                alt={comment.commenter?.userName || "Unknown"} 
                                className="w-8 h-8 rounded-full mr-3" 
                            />
                            <span className="font-semibold text-gray-800">{comment.commenter?.userName || "Unknown"}</span>
                        </div>
                        <p className="text-gray-600">{comment.commentText}</p>
                        <p className="text-gray-400 text-sm mt-1">{comment.timeStamp}</p>
                    </div>
                )) : <p className="text-gray-500">No comments yet.</p>}
            </div>

            <div className="mt-4">
                <input 
                    type="text"
                    placeholder="Enter your comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <button 
                    onClick={commented ? handleEdit : handleSend}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                >
                    {commented ? "Edit" : "Send"}
                </button>
            </div>
        </div>
    );
};

export default PostPage;
