import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import BackButton from "../../Components/BackButton";
import Loading from "../../Components/Loading";
import ToggleTheme from "../../Components/ToggleMode";
import { ThemeContext } from "../../Context/ThemeContext";
import { Link } from "react-router-dom";

const Settings = () => {
    const { handleLogout, loading, error } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    
    if(loading){
        return <Loading />
    }

    return (
        <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5">
            <BackButton />
            <div className="mt-12 mb-5">
                <h1 className="text-3xl font-bold ml-4">Settings</h1>
            </div>
            {error  && 
            <div className="text-3xl text-red-400 text-center m-2">
                {error}
            </div> }
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5">
                <ul className="space-y-4">
                    <Link to='/AboutPage' className="cursor-pointer hover:text-blue-500">About</Link>
                    <li className="cursor-pointer hover:text-blue-500 flex items-center justify-between"><p>{`${theme} mode`}</p><ToggleTheme /></li>
                    <li className="text-red-900">V.0.0.1</li>
                    <li className="cursor-pointer text-red-500 hover:text-red-700" onClick={handleLogout}>Logout</li>
                </ul>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center">
                <p>&copy; {new Date().getFullYear()}</p>
            </div>
        </div>
    );
};

export default Settings;