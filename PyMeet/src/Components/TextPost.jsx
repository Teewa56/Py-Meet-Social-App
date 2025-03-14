import { useContext, useState, useEffect } from "react";
import { PostContext } from "../Context/postContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { getPostById } from "../Services/api";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

const TextPost = ({ postId }) => {
    const [post, setPost] = useState("");
    const { PostText, EditPost, loading, error } = useContext(PostContext);
    const navigate = useNavigate();
    const poster = JSON.parse(localStorage.getItem("user"));
    const posterId = poster?._id;
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!postId) return;
        const fetchPostData = async () => {
            try {
                const res = await getPostById(postId);
                setPost(res.data.postText);
                setIsEditing(true);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };
        fetchPostData();
    }, [postId]);

    const handleSubmit = async () => {
        if (!post) return;
        try {
            if (isEditing) {
                await EditPost({ postText: post }, posterId, postId);
                toast.success("Post updated successfully!");
            } else {
                await PostText(post, posterId);
                toast.success("Post created successfully!");
            }
            navigate("/");
        } catch (error) {
            console.error("Error posting:", error);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            {error && <p className="text-red-500">{error}</p>}
            <p className="mb-4 text-xl font-semibold text-gray-800">
                {isEditing ? "Edit your post" : "What’s on your mind today?"}
            </p>
            <textarea
                className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                placeholder="Let’s hear what you have to say!"
                value={post}
                onChange={(e) => setPost(e.target.value)}
            />
            <button
                className="w-full px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                disabled={!post}
                onClick={handleSubmit}
            >
                {isEditing ? "Save Changes" : "Make Post"}
            </button>
        </div>
    );
};

TextPost.propTypes = {
    postId : PropTypes.node.isRequired
}

export default TextPost;
