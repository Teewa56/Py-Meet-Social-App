import PropTypes from "prop-types";
import { CommentContext } from "../Context/commentContext";
import { useContext, useState } from "react";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const Comment = ({ comment }) => {

    const {loading, error, LikeComment, DeleteComment, setCanEdit, UnlikeComment} = useContext(CommentContext);
    const [liked, setLiked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const user = localStorage.getItem('user');
    const likerId = (JSON.parse(localStorage.getItem('user')))._id;
    const unlikerId = (JSON.parse(localStorage.getItem('user')))._id;
    const deleterId = (JSON.parse(localStorage.getItem('user')))._id;
    const commentId = useParams();

    const handleToggleMenu = () => {
      setShowMenu(!showMenu);
    };

    const handleEdit = () => {
      setCanEdit(true);
    }

    const handleLike = async () => {
      const res = await LikeComment(commentId, likerId);
      setLiked(false);
      console.log(res.data);
    }

    const handleUnLike = async () => {
      const res = await UnlikeComment(commentId, unlikerId);
      setLiked(true);
      console.log(res.data);
    }

    const handleDelete = async () => {
      const res = await DeleteComment(commentId, deleterId);
      console.log(res);
    }

    if(loading) return <Loading />

    return (
      <div className="border rounded-lg p-4 bg-gray-100 shadow-sm max-w-md">
        {error && <p>{error}</p> }
        {showMenu &&
          <ul>
              <li onClick={handleDelete}>DeletePost</li>
              <li onClick={handleEdit}>Edit Post</li>
          </ul>
        }
        <div className="flex items-center mb-4">
        <img
          src={comment.commenter.profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="font-semibold text-gray-800">
          {comment.commenter.userName}
        </span>
      </div>
      <div className="mb-4" onDoubleClick={liked === true ? handleUnLike : handleLike}>
        <p className="text-gray-600">{comment.comment}</p>
      </div>
      <div>
        <button onClick={liked === true ? handleUnLike : handleLike}
          className="flex items-center flex-col text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={liked === true ? "red" : "white"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={liked === true ? "red" : "white"}
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span>{comment.likes.length}</span>
        </button>
      </div>
      {user && <div onClick={handleToggleMenu}>
        menu
      </div>}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    commenter: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
    }).isRequired,
    comment: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
  }).isRequired,
};

export default Comment;
