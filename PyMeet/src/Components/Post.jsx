import PropTypes from 'prop-types';
import { PostContext } from '../Context/postContext';
import { useContext , useState} from 'react';
import Loading from "../Components/Loading";

const Post = ({ post }) => {

    const { LikePost, UnlikePost, DeleteAccount, setNavigateEditPage, loading, error } =  useContext(PostContext); 
    const [liked, setLiked] = useState(false);
    const [ showMenu, setShowMenu ] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    const postId = post._id;

    const handleLike = async () => {
        const res = await LikePost(userId, postId);
        setLiked(true);
        console.log(res.data);
    }
    
    const handleUnliked = async() => {
        const res = await UnlikePost(userId, postId);
        setLiked(false);
        console.log(res.data);
    }

    const handleDelete = async() => {
        const res = await DeleteAccount(userId, postId);
        console.log(res);
    }

    const handleToggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const handleEdit = () => {
        setNavigateEditPage(true);
    }

    if(loading) return <Loading />

    return (
        <div key={post._id} className="border border-gray-300 rounded-lg p-4 bg-white shadow-md my-4">
            {error && <p>{error}</p> }
            {showMenu &&
                <ul>
                    <li onClick={handleDelete}>DeletePost</li>
                    <li onClick={handleEdit}>Edit Post</li>
                </ul>
            }
            <div className="flex items-center justify-between">
                <img className="rounded-full w-1/5 h-12 mr-4" src={post.author.profilePic} alt={`${post.author.firstName} ${post.author.lastName} profile picture`} />
                <div className="flex flex-col w-3/5">
                    <p className="font-bold">{`${post.author.firstName} ${post.author.lastName}`}</p>
                    <p className="text-gray-500">{post.author.userName}</p>
                </div>
               {user && <div className='w-1/5'>
                    <p onClick={handleToggleMenu}>Show menu</p>
                </div>}
            </div>
            <div onDoubleClick={liked === true ? handleUnliked : handleLike}>
                {post.postText && <div className="mt-4">
                    <p>{post.postText}</p>
                </div>}
                {post.postImage && 
                <div className='flex flex-col'>
                    <img className="mt-4 max-w-full" src={post.postImage} alt="post image" />
                    <p>{post.postImageCaption}</p>
                </div>}
            </div>
            <div className="flex justify-around mt-4">
                <button className="flex items-center" onClick={liked === true ? handleUnliked : handleLike}>
                    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill={liked === true ? "red" : "white" } viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.121A5.001 5.001 0 0112 10.828V3.222A4.978 4.978 0 017.478 2.59M12 22v-9M7.452 4.914l1.342-.674M15.658 4.239l-1.716.857M12 22l1.658-8.318m.808-3.893A5.001 5.001 0 0118.878 17.12m-6.6 3.89l-.005-.03M12 13a5 5 0 00-9.878.706M12 13h9.877m-2.543-3.497l-.48.48"></path>
                    </svg>
                    {post.postLikes.length}
                </button>
                <button className="flex items-center">
                    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m4-4H8m6-8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2m-4-2H6a2 2 0 01-2-2v-8a2 2 0 012-2h2m2 14h-2a2 2 0 01-2-2v-8a2 2 0 012-2h2"></path>
                    </svg>
                    {post.comments.length}
                </button>
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
            userName: PropTypes.string.isRequired
        }).isRequired,
        postText: PropTypes.string,
        postImage: PropTypes.string,
        postImageCaption : PropTypes.string,
        postLikes: PropTypes.arrayOf(PropTypes.string).isRequired,
        comments: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
};

export default Post;
