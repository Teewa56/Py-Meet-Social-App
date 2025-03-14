import PropTypes from "prop-types";
import { CommentContext } from "../Context/commentContext";
import { useContext, useState } from "react";
import Loading from "./Loading";

const Comment = ({ comment }) => {
    const { loading, error, LikeComment, UnlikeComment, DeleteComment, EditComment } = useContext(CommentContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;

    const [liked, setLiked] = useState(comment?.likes.includes(userId));
    const [showMenu, setShowMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newComment, setNewComment] = useState(comment?.comment);

    const handleToggleMenu = () => setShowMenu(!showMenu);
    const handleEdit = () => setEditMode(true);

    const handleLike = async () => {
        try {
            await LikeComment(comment._id, userId);
            setLiked(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnLike = async () => {
        try {
            await UnlikeComment(comment._id, userId);
            setLiked(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async () => {
        await DeleteComment(comment._id, userId);
    };

    const handleSaveEdit = async () => {
        await EditComment(comment._id, userId, newComment);
        setEditMode(false);
    };

    if (loading) return <Loading />;

    return (
        <div className="border rounded-lg p-4 bg-gray-100 shadow-sm max-w-md">
            {error && <p>{error}</p>}
            
            {showMenu && (
                <ul>
                    <li onClick={handleDelete}>Delete Comment</li>
                    <li onClick={handleEdit}>Edit Comment</li>
                </ul>
            )}

            <div className="flex items-center mb-4">
                <img src={comment?.commenter?.profilePic} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                <span className="font-semibold text-gray-800">{comment?.commenter?.userName}</span>
            </div>

            <div className="mb-4" onDoubleClick={liked ? handleUnLike : handleLike}>
                {editMode ? (
                    <>
                        <input 
                            value={newComment} 
                            onChange={(e) => setNewComment(e.target.value)} 
                            className="border p-2 w-full"
                        />
                        <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-2 py-1 rounded mt-2">Save</button>
                    </>
                ) : (
                    <p className="text-gray-600">{comment?.comment}</p>
                )}
            </div>

            <div>
                <button
                    onClick={liked ? handleUnLike : handleLike}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                    {liked ? "❤️" : "🤍"} {comment?.likes?.length}
                </button>
            </div>

            {user && <div onClick={handleToggleMenu}>menu</div>}
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;
