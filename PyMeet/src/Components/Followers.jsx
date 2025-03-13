import { useState, useEffect } from 'react';
import { getFollowers } from '../Services/api';
import ProfilePreview from './ProfilePreview';
import Loading from './Loading';

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const stored_user = JSON.parse(localStorage.getItem('user'));
    const userId = stored_user?.user?._id || stored_user?._id;

    useEffect(() => {
        const fetchFollowers = async () => {
            if (!userId) {
                setError("You are not logged in.");
                return;
            }

            setLoading(true);
            try {
                const res = await getFollowers(userId);
                setFollowers(res.data.followers);
            } catch (e) {
                setError(e.message);
            }
            setLoading(false);
        };

        fetchFollowers();
    }, [userId]);

    if (loading) return <Loading />;

    return (
        <div className='flex flex-col items-center'>
            {error ? (
                <div className='mt-4 text-red-500 font-semibold'>
                    <ErrorIcon />
                    <p>{error}</p>
                </div>
            ) : followers.length === 0 ? (
                <div className='flex flex-col items-center mt-4'>
                    <ErrorIcon />
                    <p>You don not have any followers yet.</p>
                </div>
            ) : (
                <div>
                    {followers.map((follower) => (
                        <ProfilePreview user={follower} key={follower._id} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Reusable error icon component
const ErrorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-15">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export default Followers;
