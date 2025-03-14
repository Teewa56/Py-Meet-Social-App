import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import NewPostBtn from "../../Components/AddNewPostButton";
import { getUserProfile } from "../../Services/api";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = JSON.parse(localStorage.getItem("user"))._id || JSON.parse(localStorage.getItem("user")).user._id;
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser.user || storedUser);
        setLoading(false);
    },[]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await getUserProfile(userId);
                setUser(res.data); // Update state
                localStorage.setItem("user", JSON.stringify(res.data)); 
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchUserProfile();
    }, [userId]); // Runs whenever userId changes
    

    if (loading) return <div className="h-screen"><Loading /></div>;
    
    return (
        <div className="p-5">
            <Link to="/SettingsPage" className="flex justify-end m-5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
            </Link>
            <NewPostBtn />
            <div className="relative">
                <div className="w-full h-60 rounded-b-lg overflow-hidden">
                    <img src={user.coverPic || "/images/Avatar.png"} alt="Cover" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 p-2 mb-10">
                    <img src={user.profilePic || "/images/Avatar.png"} alt="Profile" className="profile-pic-size rounded-full border-4 border-white" />
                </div>
            </div>

            {user && (
                <>
                    <div className="mt-20 text-center">
                        <p className="text-xl font-semibold">{`${user.firstName || ''} ${user.lastName || ''}`}</p>
                        <p className="text-gray-600">{`${user.userName || ''}`}</p>
                    </div>

                    <div className="flex justify-around items-center mt-4">
                        <div className="text-center">
                            <p className="text-lg font-semibold">{user.followers?.length || 0}</p>
                            <p className="text-gray-600">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">{user.following?.length || 0}</p>
                            <p className="text-gray-600">Following</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-semibold">{user.posts?.length || 0}</p>
                            <p className="text-gray-600">Posts</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        {user.profileSetUp ? (
                            <Link to="/EditProfilePage">
                                <button className="px-6 py-2 w-40 bg-blue-500 text-white rounded-lg">Edit Profile</button>
                            </Link>
                        ) : (
                            <Link to="/SetupPage">
                                <button className="px-6 py-2 w-40 bg-blue-500 text-white rounded-lg">Setup Profile</button>
                            </Link>
                        )}
                    </div>

                    <div className="mt-8">
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold">About</h3>
                            <p className="text-gray-600">Age: {user.age || ''}</p>
                            {user.DOB && (
                                <p className="text-gray-600">DOB: {`${user.DOB.day || ''}/${user.DOB.month || ''}/${user.DOB.year || ''}`}</p>
                            )}
                            <p className="text-gray-600">Gender: {user.gender || ''}</p>
                            <p className="text-gray-600">Occupation: {user.occupation || ''}</p>
                            <p className="text-gray-600">Bio: {user.bio || ''}</p>
                            <p className="text-gray-600">Region: {user.region || ''}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserProfile;
