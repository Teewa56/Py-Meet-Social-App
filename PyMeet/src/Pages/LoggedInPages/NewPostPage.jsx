import { useState } from "react"
import ImagePost from "../../Components/ImagePost";
import TextPost from "../../Components/TextPost";
import BackButton from "../../Components/BackButton"

const NewPostPage = () =>{
    const [postText, setPostText ] = useState(false);

    return(
        <>
            <div>
                <BackButton />
                <h3 className="font-bold text-3xl text-center">New Post</h3>
            </div>
            <div className="flex items-center justify-center space-x-4"> 
                <button onClick={()=>setPostText(true)} className={postText ? `border-b-2 border-black` : ""}>Post Image</button>
                <button onClick={()=>setPostText(false)} className={postText ? `border-b-2 border-black` : ""}>Post Text</button>
            </div>
            {postText ? <ImagePost /> : <TextPost /> }
        </>
    )
}

export default NewPostPage;