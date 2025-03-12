import { useContext, useState, /*useEffect*/ } from "react";
import { PostContext } from "../Context/postContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const TextPost = () => {
    const [postText, setPostText] = useState("");
    const { PostText, error, loading, EditPost } = useContext(PostContext);
    const poster = JSON.parse(localStorage.getItem('user'));
    const [isPosted, setIsposted] = useState(false);
    const posterId = poster._id;
    const navigate = useNavigate();

    /*useEffect(() => {
        const fetchPostData = async() => {
            //Check how i can get the id of the post i am returning, 
            //Probs i get it from the server instead of the localStorage
            const post = poster.posts.postId
            const text = poster.posts.post(postId);
            setPostText(text);
        };
        fetchPostData();
    },[postId])*/

    const handleEditPost = async() => {
        const res = await EditPost(postText, posterId)
        window.alert(res.data);//or consolelog to check what is there
        navigate("/");
    }

    const handlePost = async () => {
        if (!postText) return;

        try {
            await PostText(postText, posterId);
            setIsposted(true);
            navigate("/");
        } catch (error) {
            console.error("Error posting text:", error);
        }
    }

    if (loading) return <Loading />

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
                <p className="mb-4 text-xl font-semibold text-gray-800">What is on your mind today?</p>
                <textarea
                    className="w-full h-32 p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Let's hear what you have to say!"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                />
                <button
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={!postText}
                    onClick={isPosted === true ? handleEditPost : handlePost}
                >
                    { isPosted === true ? "Save changes" : "Make Post"}
                </button>
            </div>
        </>
    )
}

export default TextPost;
