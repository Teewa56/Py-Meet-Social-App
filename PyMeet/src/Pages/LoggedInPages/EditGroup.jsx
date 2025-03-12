import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GroupContext } from "../context/GroupContext";
import BackButton from "../Components/BackButton";

const EditGroup = () => {
    const { EditGroupInfo, UpdateGroupMembers, error: contextError, loading } = useContext(GroupContext);
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    // This assumes you have the group ID from URL params or props
    const groupId = new URLSearchParams(window.location.search).get('groupId');
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    const handleAddMember = (member) => {
        if (!members.some(m => m.id === member.id)) {
            setMembers([...members, member]);
        }
    };
    
    const handleRemoveMember = (memberId) => {
        setMembers(members.filter(member => member.id !== memberId));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Update group info
            await EditGroupInfo(groupId, currentUser._id, { name: groupName });
            
            // Update members
            await UpdateGroupMembers(groupId, { members: members.map(m => m.id) });
            
            navigate('/groups');
        } catch (err) {
            setError(err.message || 'Failed to update group');
        }
    };
    
    return(
        <>
            <div>
                <BackButton />
                <h3>Edit Group</h3>
            </div>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Group Name:
                    <input 
                        type="text"
                        id="name"
                        placeholder="Enter Group Name"
                        maxLength="20"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </label>
                
                <div>
                    <label htmlFor="members">
                        Members:
                        <select 
                            id="members"
                            multiple
                            onChange={(e) => {
                                const options = Array.from(e.target.selectedOptions);
                                const selectedMembers = options.map(option => ({
                                    id: option.value,
                                    name: option.text
                                }));
                                setMembers(selectedMembers);
                            }}
                        >
                            {/* Render your list of followings as options */}
                        </select>
                    </label>
                </div>
                
                {members.length > 0 && (
                    <div>
                        <h4>Selected Members:</h4>
                        <ul>
                            {members.map(member => (
                                <li key={member.id}>
                                    {member.name}
                                    <button 
                                        type="button"
                                        onClick={() => handleRemoveMember(member.id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {(error || contextError) && (
                    <div className="error">{error || contextError}</div>
                )}
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </>
    );
};

export default EditGroup;