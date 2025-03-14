import { useState } from "react";
import Following from "../../Components/Following";
import Followers from "../../Components/Followers";
import BackButton from '../../Components/BackButton';

const NewChatsPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCheckboxChange = (user) => {
        setSelectedUser(user); // Set only one user at a time
    };

        return (
        <div className="p-5">
            <div className="flex justify-start items-center space-x-3" >
                <BackButton />
                <h2 className="text-2xl font-bold" >Start a New Chat</h2>
            </div>

            {/* Followers List with Single Selection */}
            <Followers>
                {(follower) => (
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedUser?._id === follower._id}
                            onChange={() => handleCheckboxChange(follower)}
                        />
                        {follower.name}
                    </label>
                )}
            </Followers>

            {/* Following List with Single Selection */}
            <Following>
                {(following) => (
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedUser?._id === following._id}
                            onChange={() => handleCheckboxChange(following)}
                        />
                        {following.name}
                    </label>
                )}
            </Following>

        </div>
    );
};

export default NewChatsPage;
