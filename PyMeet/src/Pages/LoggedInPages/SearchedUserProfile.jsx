import { useContext, useEffect, useState } from "react";
import BackButton from "../../Components/BackButton";
import { getUserProfile } from "../../Services/api";
import { UserContext } from "../../Context/userContext";
import Loading from "../../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";

const SearchedUserProfile = () => {
   
    const [user, setUser ] = useState([]);
    const [following, setIsfollowing ] = useState(null);
    const [Error, setError] = useState(null);
    const { followuser, unFollowUser, loading, error } = useContext(UserContext);
    const storedUser = localStorage.getItem('user');
    const userId = storedUser._id;
    const followId = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async() => {
            try{
                const res = await getUserProfile(followId);
                const data = res.json();
                setUser(data)
            }catch(error){
                setError(error.message);
            }
        }
        fetchUserProfile();
    }, [followId])

    const handleFollow = async() => {
        await followuser(userId, followId);
        setIsfollowing(true);
    }
    const handleUnfollow = async() => {        
        await unFollowUser(userId, followId);
        setIsfollowing(false);
    }
    const handleNavigate = () => {
        navigate("/ChatsGroupsPage")
    }

    if(loading) return <Loading /> ;

    return (
     <div>
        <div className="header">
            <BackButton />
            {error && <p>{error}</p> }
            {Error && <p>{Error}</p> }
            <img src={user.coverPic} alt={`${user.userName} cover picture`} />
            <div className="flex justify-start items-center">
                <img src={user.profilePic} alt={`${user.userName} profile picture`} />
                <div className="flex flex-col">
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <p>{user.userName}</p>
                    <div className="flex items-center justify-between">
                        <button onClick={following ? handleUnfollow : handleFollow}>{following === true ? "Unfollow" : "Follow"}</button>
                        <button onClick={handleNavigate}>Message</button>
                    </div>
                </div>
            </div>
            <div className="flex justify-evenly items-center">
                <div className="flex flex-col my-4">
                    <p>user.posts</p>
                    <p>user.posts.length</p>
                </div>
                <div className="flex flex-col my-4">
                    <p>{user.followers.length}</p>
                    <p>Followers</p>
                </div>
                <div className="flex flex-col my-4">
                    <p>{user.following.length}</p>
                    <p>Following</p>
                </div>
            </div>
        </div>
        <div>
            <div>
                <h3>About</h3>
                <p>{user.bio}</p>
                <p>{user.DOB}</p>
                <p>{user.region}</p>
                <p>{user.hobby}</p>
                <p>{user.gender}</p>
                <p>{user.occupation}</p>
            </div>
            <div>
                <h2>Posts</h2>
            </div>
        </div>
     </div>
  )
}

export default SearchedUserProfile;