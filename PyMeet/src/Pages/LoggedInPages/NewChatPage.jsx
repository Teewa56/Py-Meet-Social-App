import { useState } from "react";
import { Link } from 'react-router-dom';
import Followers from "../../Components/Following";
import Following from "../../Components/Followers";
import BackButton from '../../Components/BackButton';

const NewChatPage = () => {

    //add the clicked chat to the recent chats if a message is sent 
    //redirect to the clicked chat page by using the id OF THE CLICKED follower of follwowing
    //

    const [showFriends, setShowFriends] = useState(true);

    return(
        <>
            <div>
                <BackButton />
                <h3>New Chat</h3>
            </div>

            <div>
                <div onClick={()=>setShowFriends(true)}>Followers{Followers.length.toString()}</div>
                <div onClick={()=>setShowFriends(false)}>Following{Following.length.toString()}</div>
            </div>
            <Link to='/NewGroupPage' >Create New Group</Link>
            {showFriends ? <div> <Followers /></div> : <div><Following /></div> }
        </>
    )
}

export default NewChatPage;