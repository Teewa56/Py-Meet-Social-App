import { useState, useContext, useEffect } from "react";
import { PostContext } from "../Context/postContext";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getPostById } from "../Services/api";
import PropTypes from 'prop-types';

const ImagePost = ({ postId }) => {
    const [data, setData] = useState({ postImage: "", postImageCaption: "" });
    const [imgPostPreview, setImgPostPreview] = useState(null);
    const { PostImage, EditPost, loading, error } = useContext(PostContext);
    const navigate = useNavigate();
    const poster = JSON.parse(localStorage.getItem("user"));
    const posterId = poster?._id;
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!postId) return;
        const fetchPostData = async () => {
            try {
                const res = await getPostById(postId);
                setData(res.data);
                setImgPostPreview(res.data.postImage);
                setIsEditing(true);
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };
        fetchPostData();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.postImage || !data.postImageCaption) return;

        if (!isEditing) {
            const formData = new FormData();
            formData.append("file", data.postImage);
            formData.append("upload_preset", "pymeet");

            try {
                const res = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );
                const imgUrl = res.data.secure_url;
                const tempData = { ...data, postImage: imgUrl };
                await PostImage(tempData, posterId);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        } else {
            await EditPost(data, posterId, postId);
        }

        navigate("/");
    };

    return loading ? (
        <Loading />
    ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            {error && <p className="text-red-500">{error}</p>}
            <input type="file" onChange={(e) => setData({ ...data, postImage: e.target.files[0] })} required />
            {imgPostPreview && <img src={imgPostPreview} alt="Preview" className="w-full h-40 border border-gray-300 rounded-md" />}
            <textarea value={data.postImageCaption} onChange={(e) => setData({ ...data, postImageCaption: e.target.value })} required />
            <button type="submit">{isEditing ? "Save Changes" : "Make Post"}</button>
        </form>
    );
};

ImagePost.propTypes = {
    postId : PropTypes.node.isRequired
}

export default ImagePost;
