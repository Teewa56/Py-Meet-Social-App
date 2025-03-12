import { useState, useEffect } from 'react';
import { getFollowers } from '../Services/api';
import ProfilePreview from './ProfilePreview';
import Loading from './Loading';

const Followers = () => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError ] = useState(null)
    const stored_user = JSON.parse(localStorage.getItem('user'));
    const userId = stored_user && stored_user._id;

    useEffect(() => {
        const fetchFollowers = async () => {
            if (userId) {
                setLoading(true);
                try {
                    const res = await getFollowers(userId);
                    setFollowers(Array.isArray(res.data) ? res.data : []);
                } catch (e) {
                    setError(e.message);
                }
                setLoading(false);
            } else {
                setError("You are not Logged in")
            }
        }
        fetchFollowers();
    }, [userId]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col items-center'>
            {error && 
                <div className='mt-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-15">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            {error}
            </div> }
            {followers.length === 0 && !error ? (
                <div className='flex flex-col items-center mt-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-15">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <p>You dont have any followers yet</p>
            </div>
            ) : (
                <div>
                    {followers.map((follower, id) => (
                        <ProfilePreview user={follower} key={id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Followers;
