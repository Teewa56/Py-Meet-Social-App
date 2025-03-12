import { useState, useEffect } from 'react';
import { getFollowing } from '../Services/api';
import Loading from './Loading';
import ProfilePreview from './ProfilePreview';

const Following = () => {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState(null)

    useEffect(() => {
        const stored_user = JSON.parse(localStorage.getItem('user'));
        const userId = stored_user && stored_user._id;

        const fetchFollowing = async () => {
            if (userId) {
                setLoading(true);
                try {
                    const res = await getFollowing(userId);
                    setFollowing(Array.isArray(res.data) ? res.data : []);
                } catch (error) {
                    setError(error.message);
                }
                setLoading(false);
            } else {
                setError('User information is missing.');
            }
        }

        fetchFollowing();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className='flex flex-col items-center'>
            {error && 
            <div className='mt-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-15">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {error}
            </div> }
            {following.length === 0 && !error ? (
                <div className='flex flex-col items-center mt-4'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-15">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p>You are not following anyone yet</p>
                </div>
            ) : (
                <div>
                    {following.map((follower, id) => (
                        <ProfilePreview user={follower} key={id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Following;
