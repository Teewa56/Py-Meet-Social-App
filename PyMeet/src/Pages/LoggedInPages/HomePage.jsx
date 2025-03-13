import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Posts from "../../Components/Posts";

const HomePage = () => {
    const [userName, setUserName] = useState("");
    const [profilePic, setProfilePic] = useState("/images/Avatar.png");
    const navigate = useNavigate();

    useEffect(() => {
        const active_user = JSON.parse(localStorage.getItem('user'));
        setUserName(active_user.userName || active_user.user.userName);
        setProfilePic(active_user.user.profilePic || "/images/Avatar.png");
    }, []);

    const handleNavigate = () => {
        navigate("/SearchPage")
    }
    return (
        <div className="h-screen p-5">
            <div className="flex justify-between items-center mb-5 bg-blue-500 p-5 rounded-lg">
                <div className="flex justify-start items-center">
                    <Link to="/UserProfile"> 
                        <img src={profilePic} alt="Profile" className="w-12 h-12 rounded-full" />
                    </Link>
                    <div className="flex flex-col ml-4">
                        <p className="text-3xl font-bold">PiMeet</p>
                        <p className="text-sm">{userName}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {/*svg for notification and link to notification page*/}
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={handleNavigate}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0z" />
                    </svg>                   
                </div>
            </div>

            <div className="mb-5">
                <Posts />
            </div>
        </div>
    );
};

export default HomePage;
