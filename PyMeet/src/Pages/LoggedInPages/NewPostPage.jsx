import { useState, useContext, useEffect } from "react";
import ImagePost from "../../Components/ImagePost";
import TextPost from "../../Components/TextPost";
import BackButton from "../../Components/BackButton";
import { PostContext } from "../../Context/postContext";
import { useSearchParams } from "react-router-dom";

const NewPostPage = () => {
    const { postToEdit } = useContext(PostContext);
    const [searchParams] = useSearchParams();
    const postId = searchParams.get("postId");

    const [isTextPost, setIsTextPost] = useState(true);

    useEffect(() => {
        if (postToEdit) {
            setIsTextPost(!postToEdit.postImage);
        }
    }, [postToEdit]);

    return (
        <>
            <div>
                <BackButton />
                <h3 className="font-bold text-3xl text-center">New Post</h3>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <button onClick={() => setIsTextPost(false)} className={!isTextPost ? "border-b-2 border-black" : ""}>Post Image</button>
                <button onClick={() => setIsTextPost(true)} className={isTextPost ? "border-b-2 border-black" : ""}>Post Text</button>
            </div>
            {isTextPost ? <TextPost postId={postId} /> : <ImagePost postId={postId} />}
        </>
    );
};

export default NewPostPage;
