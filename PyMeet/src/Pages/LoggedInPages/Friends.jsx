import Followers from "../../Components/Followers";
import Following from "../../Components/Following";
import { useState } from "react";

const FriendsPage = () => {
    const [showFriends, setShowFriends] = useState(true);

    return (
        <>
            <div className="h-screen p-5">
                <p className="text-2xl font-bold space-x-2">Friends</p>
                <div className="flex justify-around items-center mt-4">
                    <div 
                        onClick={() => setShowFriends(true)} 
                        className={`cursor-pointer ${showFriends ? 'border-b-2 border-black' : ''}`}
                    >
                        {`Followers ${Followers.length}`}
                    </div>
                    <div 
                        onClick={() => setShowFriends(false)} 
                        className={`cursor-pointer ${!showFriends ? 'border-b-2 border-black' : ''}`}
                    >
                        {`Following ${Following.length}`}
                    </div>
                </div>
                {showFriends ? <Followers /> : <Following />}
            </div>
        </>
    );
}

export default FriendsPage;
