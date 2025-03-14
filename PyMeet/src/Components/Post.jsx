import PropTypes from 'prop-types';
import { PostContext } from '../Context/postContext';
import { useContext, useState, useEffect } from 'react';
import Loading from "../Components/Loading";
import { Link, useParams } from 'react-router-dom';

const Post = ({ post }) => {
    const { LikePost, UnlikePost, DeletePost, triggerEditNavigation, loading, error } = useContext(PostContext);
    const [liked, setLiked] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;
    const { postId : PostId } = useParams();
    const postId = post._id || PostId
    const author = Array.isArray(post.author) && post.author.length > 0 ? post.author[0] : {};

    useEffect(() => {
        if (Array.isArray(post.postLikes)) {
            setLiked(post.postLikes.includes(userId));
        }
    }, [post?.postLikes, userId]);


    const handleLike = async () => {
        if (!liked) {
            await LikePost(userId, postId);
            setLiked(true);
            window.location.reload();
        }
    };

    const handleUnlike = async () => {
        if (liked) {
            await UnlikePost(userId, postId);
            setLiked(false);
            window.location.reload();
        }
    };

    const handleDelete = async () => {
        await DeletePost(userId, postId);
        setShowMenu(false);
        window.location.reload();
    };

    const handleToggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const handleEdit = () => {
        console.log("Edit button clicked");
        triggerEditNavigation(postId)
    };

    if (loading) return <Loading />;

    return (
        <div className="border border-gray-300 rounded-lg p-4 bg-white text-black shadow-lg mb-6 relative">
        {error && <p className="text-red-500">{error.msg}</p>}  
        {showMenu && (
        <ul className="absolute right-0 bg-white shadow-lg rounded-md p-2 w-32">
            <li className="cursor-pointer text-red-500 p-2 hover:bg-gray-100" onClick={handleDelete}>
                Delete Post
            </li>
            <li className="cursor-pointer p-2 hover:bg-gray-100" onClick={handleEdit}>
                Edit Post
            </li>
        </ul>
    )}

    <div className="flex items-center justify-between">
        <img 
            className="rounded-full w-12 h-12 mr-4 object-cover" 
            src={author.profilePic} 
            alt={`${author.firstName} ${author.lastName} profile`} 
        />
        <div className="flex flex-col w-3/5 truncate">
            <p className="font-bold">{`${author.firstName} ${author.lastName}`}</p>
            <p className="text-gray-500 text-sm truncate">@{author.userName}</p>
        </div>
        {user && (
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleToggleMenu} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />    
            </svg>
        )}
    </div>

    {/* Post Content */}
    <div onDoubleClick={liked ? handleUnlike : handleLike} className="mt-4">
        <Link to={`/PostPage/${post._id}`} >                
            {post.postText && <p className="text-gray-800">{post.postText}</p>}
            {post.postImage && (
                <div className="flex flex-col mt-4">
                    <img className="max-w-full post-h rounded-md object-cover" src={post.postImage} alt="Post" />
                    {post.postImageCaption && <p className="text-gray-600 text-sm mt-2">{post.postImageCaption}</p>}
                </div>
            )}
        </Link>
    </div>

    {/* Like & Comment Section */}
    <div className="flex justify-around mt-4">
        <button className="flex items-center space-x-2 hover:text-red-500 transition-all duration-300" onClick={liked ? handleUnlike : handleLike}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={liked ? "red" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span>{post.postLikes?.length}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-blue-500 transition-all duration-300">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8m6-8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2m-4-2H6a2 2 0 01-2-2v-8a2 2 0 012-2h2m2 14h-2a2 2 0 01-2-2v-8a2 2 0 012-2h2"></path>
            </svg>
            <span>{post.comments?.length}</span>
        </button>
    </div>
    <div>
        <p>{post.timeStamp}</p>
    </div>
</div>

    );
};

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        author: PropTypes.shape({
            profilePic: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            length: PropTypes.number.isRequired,
        }).isRequired,
        postText: PropTypes.string,
        postImage: PropTypes.string,
        postImageCaption: PropTypes.string,
        postLikes: PropTypes.arrayOf(PropTypes.string).isRequired,
        comments: PropTypes.arrayOf(PropTypes.string).isRequired,
        timeStamp: PropTypes.string.isRequired
    }).isRequired
};

export default Post;
