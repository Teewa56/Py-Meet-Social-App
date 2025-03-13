import Followers from "../../Components/Followers";
import Following from "../../Components/Following";
import { useEffect, useState } from "react";
import { getFollowers, getFollowing } from "../../Services/api";

const FriendsPage = () => {
    const [showFriends, setShowFriends] = useState(true);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    useEffect(() => {
        const fetchFollowers = async () => {
            const stored_user = JSON.parse(localStorage.getItem('user'));
            const userId = stored_user?.user?._id || stored_user?._id;
            try {
                const resFollowers = await getFollowers(userId);
                const resFollowing = await getFollowing(userId);
                setFollowers(resFollowers.data.followers.length);
                setFollowing(resFollowing.data.following.length);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchFollowers();
    }, [])

    return (
        <>
            <div className="h-screen p-5">
                <p className="text-2xl font-bold space-x-2">Friends</p>
                <div className="flex justify-around items-center mt-4">
                    <div 
                        onClick={() => setShowFriends(true)} 
                        className={`cursor-pointer ${showFriends ? 'border-b-2 border-black' : ''}`}
                    >
                        {`Followers ${followers}`}
                    </div>
                    <div 
                        onClick={() => setShowFriends(false)} 
                        className={`cursor-pointer ${!showFriends ? 'border-b-2 border-black' : ''}`}
                    >
                        {`Following ${following}`}
                    </div>
                </div>
                {showFriends ? <Followers /> : <Following />}
            </div>
        </>
    );
}

export default FriendsPage;
