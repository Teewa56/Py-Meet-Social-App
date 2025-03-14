import { useContext, useEffect, useState } from "react";
import BackButton from "../../Components/BackButton";
import { getUserProfile } from "../../Services/api";
import { UserContext } from "../../Context/userContext";
import Loading from "../../Components/Loading";
import { useNavigate, useParams } from "react-router-dom";

const SearchedUserProfile = () => {
    const [user, setUser] = useState(null);
    const [following, setIsFollowing] = useState(null);
    const [Error, setError] = useState(null);
    const { followuser, unFollowUser, loading, error } = useContext(UserContext);    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser._id || storedUser.user._id;
    const { userId: followId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await getUserProfile(followId);
                setUser(res.data);
                setIsFollowing(res.data.followers.includes(userId));
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUserProfile();
    }, [followId, userId]);

    const handleFollow = async () => {
        const res = await followuser(userId, followId);
        if(res && !error){
            setIsFollowing(true);
            setUser((prev) => ({
                ...prev,
                followers : [...prev.followers, userId]
            }));
            const updatedUser = { ...storedUser, following: [...storedUser.following, followId] };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };

    const handleUnfollow = async () => {
        const res = await unFollowUser(userId, followId);
        if(res && !error){
            setIsFollowing(false);
            setUser((prev) => ({
                ...prev,
                followers : prev.followers.filter((id) => id !== userId)
            }));
            const updatedUser = { 
                ...storedUser, 
                following: storedUser.following.filter((id) => id !== followId) 
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        };
    };

    const handleNavigate = () => {
        navigate(`/Chat/${followId}`);
    };

    if (loading) return <Loading />;

    return (
        <div className="h-screen p-5">
            <div className="shadow-lg ">
                <BackButton />
                
                {error && <p className="text-red-500 text-center">{error}</p>}
                {Error && <p className="text-red-500 text-center">{Error}</p>}

                {user && (
                    <>
                        {/* Cover Photo */}
                        <img
                            src={user.coverPic}
                            alt={`${user.userName} cover`}
                            className="w-full h-40 object-cover rounded-lg"
                        />

                        {/* Profile Info */}
                        <div className="flex items-center space-x-4 mt-4">
                            <img
                                src={user.profilePic}
                                alt={`${user.userName} profile`}
                                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                                <p className="text-gray-500">@{user.userName}</p>
                                <div className="flex space-x-3 mt-2">
                                    <button
                                        onClick={following ? handleUnfollow : handleFollow}
                                        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
                                            following ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    >
                                        {following ? "Unfollow" : "Follow"}
                                    </button>
                                    <button
                                        onClick={handleNavigate}
                                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium"
                                    >
                                        Message
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-around mt-6 text-center">
                            <div>
                                <p className="text-lg font-semibold">{user.posts?.length || 0}</p>
                                <p className="text-gray-500">Posts</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user.followers?.length || 0}</p>
                                <p className="text-gray-500">Followers</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">{user.following?.length || 0}</p>
                                <p className="text-gray-500">Following</p>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold border-b pb-2">About</h3>
                            <p className="mt-2 text-gray-700">{user.bio || "No bio available"}</p>
                            <p className="text-gray-600">
                                <strong>DOB:</strong> {user.DOB ? `${user.DOB.day}/${user.DOB.month}/${user.DOB.year}` : "N/A"}
                            </p>
                            <p className="text-gray-600"><strong>Region:</strong> {user.region || "N/A"}</p>
                            <p className="text-gray-600"><strong>Email:</strong> {user.email || "N/A"}</p>
                            <p className="text-gray-600"><strong>Gender:</strong> {user.gender || "N/A"}</p>
                            <p className="text-gray-600"><strong>Occupation:</strong> {user.occupation || "N/A"}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchedUserProfile;
