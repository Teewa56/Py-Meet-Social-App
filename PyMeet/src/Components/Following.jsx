import { useState, useEffect } from 'react';
import { getFollowing } from '../Services/api';
import Loading from './Loading';
import ProfilePreview from './ProfilePreview';

const Following = () => {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const stored_user = JSON.parse(localStorage.getItem('user'));
        const userId = stored_user?.user?._id || stored_user?._id;

        const fetchFollowing = async () => {
            if (!userId) {
                setError("User information is missing.");
                setLoading(false);
                return;
            }
            try {
                const res = await getFollowing(userId);
                setFollowing(res.data.following);
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };

        fetchFollowing();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className='flex flex-col items-center'>
            {error ? (
                <div className='mt-4 text-red-500 font-semibold'>
                    <ErrorIcon />
                    <p>{error}</p>
                </div>
            ) : following.length === 0 ? (
                <div className='flex flex-col items-center mt-4'>
                    <ErrorIcon />
                    <p>You are not following anyone yet.</p>
                </div>
            ) : (
                following.map((follower) => (
                    <ProfilePreview user={follower} key={follower._id} />
                ))
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

export default Following;
