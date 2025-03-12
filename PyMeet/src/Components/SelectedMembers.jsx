import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const SelectedMembers = ({ onClose, onMembersSelected }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                // Replace this with actual API call to get your friends
                // For now using mock data
                const mockFriends = [
                    { id: '1', name: 'Friend 1' },
                    { id: '2', name: 'Friend 2' },
                    { id: '3', name: 'Friend 3' },
                ];
                setFriends(mockFriends);
            } catch (error) {
                console.error('Error fetching friends:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFriends();
    }, []);
    
    const handleToggleFriend = (friend) => {
        if (selectedFriends.some(selected => selected.id === friend.id)) {
            setSelectedFriends(selectedFriends.filter(selected => selected.id !== friend.id));
        } else {
            setSelectedFriends([...selectedFriends, friend]);
        }
    };
    
    const handleSave = () => {
        onMembersSelected(selectedFriends);
    };
    
    if (loading) {
        return <div>Loading friends...</div>;
    }
    
    return (
        <div className="member-selector">
            <div className="member-selector-header">
                <h3>Select Members</h3>
                <button onClick={onClose}>Close</button>
            </div>
            
            {friends.length === 0 ? (
                <p>You don't have any friends to add to the group.</p>
            ) : (
                <div className="friends-list">
                    {friends.map((friend) => (
                        <div key={friend.id} className="friend-item">
                            <input 
                                type="checkbox" 
                                id={`friend-${friend.id}`}
                                checked={selectedFriends.some(selected => selected.id === friend.id)}
                                onChange={() => handleToggleFriend(friend)}
                            />
                            <label htmlFor={`friend-${friend.id}`}>{friend.name}</label>
                        </div>
                    ))}
                </div>
            )}
            
            <div className="member-selector-footer">
                <button 
                    onClick={handleSave}
                    disabled={selectedFriends.length === 0}
                >
                    Save ({selectedFriends.length} selected)
                </button>
            </div>
        </div>
    );
};

SelectedMembers.propTypes = {
    onClose: PropTypes.func.isRequired,
    onMembersSelected: PropTypes.func.isRequired
};

export default SelectedMembers;