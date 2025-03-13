import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfilePreview = ({ user }) => {
    if (!user) return <h1 className="text-center text-red-500 font-semibold">User not available!</h1>;

    return (
        <>
            <Link to={`/SearchedUserProfile/${user._id}`} className="block w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                    {/* Profile Image */}
                    <img src={user.profilePic} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-300" />

                    {/* User Details */}
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-800">{`${user.firstName} ${user.lastName}`}</span>
                        <span className="text-sm text-gray-500">@{user.userName}</span>
                    </div>
                </div>
            </Link>
            <hr className="my-3 border-gray-300" />
        </>
    );
};

ProfilePreview.propTypes = {
    user: PropTypes.shape({
        profilePic: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired,
};

export default ProfilePreview;
