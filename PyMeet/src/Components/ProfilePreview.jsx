import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ProfilePreview = ({ user }) => {
    ProfilePreview.propTypes= {
        user : PropTypes.shape({
            profilePic: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
            _id : PropTypes.string.isRequired
        }).isRequired,
    }

    return (
        <>
        <Link to={`/SearchedUserPage/${user._id}`} className='w-full h-30 p-5 ' >
            <div className="flex items-center justify-start">
                <img src={user.profilePic} alt="Profile"  className='w-20 h-20 rounded-full'/>
                <div className='flex felx-col'>
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                    <span>{user.userName}</span>
                </div>
            </div>
        </Link>
        <hr />
        </>
    );
};

export default ProfilePreview;
