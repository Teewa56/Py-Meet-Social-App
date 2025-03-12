import { useState, useContext } from 'react';
import { PostContext } from '../Context/postContext';
import Loading from "../Components/Loading";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ImagePost = () => {
    const [data, setData] = useState({ postImage : "", postImageCaption : ""});
    const [imgPostPreview, setImgPostPreview] = useState(null);
    const { PostImage, error, loading } = useContext(PostContext);
    const poster = JSON.parse(localStorage.getItem('user'));
    const posterId = poster._id;
    const navigate = useNavigate();

    const isImage = (file) => {
        const fileType = file['type'];
        const validImageTypes = ['image/jpg', "image/jpeg", "image/png", "image/gif"];
        return validImageTypes.includes(fileType);
    }

    //useeffect to get the posts from local storage
    //set the informationto theh default ones 
    //navigate to the homepage

    const handlePostImageChange = (e) => {
        const file = e.target.files[0];
        if (isImage(file)) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setData({ ...data, postImage: file });
                setImgPostPreview(fileReader.result);
            }
            fileReader.readAsDataURL(file);
        } else {
            alert('Please upload a valid image file (jpg, jpeg, png, gif)');
            return;
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.postImage || !data.postImageCaption) return;
    
        const formData = new FormData();
        formData.append('file', data.postImage);
        formData.append('upload_preset', 'pymeet');
        
        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
            const imgUrl = res.data.secure_url;
            setData({ ...data, postImage: imgUrl })
            await PostImage(data, posterId);
            navigate("/")
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    }
    
    if (loading) return <Loading />

    return (
        <>
            {error && <div className="text-red-500"><p>{error}</p></div>}
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <p className="text-lg font-semibold mb-4">What is on your mind today?</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="postImg" className="cursor-pointer flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-20">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                            </svg>
                        </label>
                        <input 
                            type="file"
                            id='postImg'
                            className='hidden'
                            onChange={handlePostImageChange} 
                            required
                        />
                    </div>
                    {imgPostPreview && (
                        <div className="mb-4">
                            <img src={imgPostPreview} alt="Preview" className="w-full h-40 border border-gray-300 rounded-md" />
                        </div>
                    )}
                    <textarea 
                        placeholder='Caption'
                        value={data.postImageCaption}
                        onChange={(e) => setData({ ...data, postImageCaption: e.target.value })} 
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        required
                    />
                    <input 
                        type="submit" 
                        value="Make Post" 
                        disabled={!data.postImage || !data.postImageCaption}
                        className={`w-full p-2 text-white font-semibold rounded-md ${!data.postImage || !data.postImageCaption ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
                    />
                </form>
            </div>
        </>
    )
}

export default ImagePost;
