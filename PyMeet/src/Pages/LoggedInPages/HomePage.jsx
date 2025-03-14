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
        setProfilePic(active_user.profilePic || "/images/Avatar.png");
    }, []);

    const handleNavigate = () => {
        navigate("/SearchPage")
    }
    const handleNavigateNots = () => {
        navigate("/Notification")
    }
    return (
        <div className="p-5">
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleNavigateNots}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>
                    <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={handleNavigate}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M3 10a7 7 0 1 0 14 0 7 7 0 0 0-14 0z" />
                    </svg>                   
                </div>
            </div>

            <Posts />
        </div>
    );
};

export default HomePage;
