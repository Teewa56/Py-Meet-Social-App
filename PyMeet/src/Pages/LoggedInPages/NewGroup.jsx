import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { GroupContext } from "../context/GroupContext";
import BackButton from "../Components/BackButton";
import SelectedMembers from "../Components/SelectedMembers";

const NewGroup = () => {
    const { CreateGroup, error: contextError, loading } = useContext(GroupContext);
    const [groupName, setGroupName] = useState('');
    const [showMemberSelector, setShowMemberSelector] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const handleMembersSelected = (members) => {
        setSelectedMembers(members);
        setShowMemberSelector(false);
    };
    
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        
        if (!groupName.trim()) {
            setError('Group name is required');
            return;
        }
        
        if (selectedMembers.length === 0) {
            setError('Please select at least one member');
            return;
        }
        
        try {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            
            const groupData = {
                name: groupName,
                creator: currentUser._id,
                members: [...selectedMembers.map(member => member.id), currentUser._id]
            };
            
            await CreateGroup(groupData);
            
            alert('Group successfully created');
            navigate('/groups');
        } catch (err) {
            setError('Error occurred while creating group. Please try again later.');
        }
    };
    
    return(
        <>
            <div>
                <BackButton />
                <h3>New Group</h3>
            </div>
            
            <form onSubmit={handleCreateGroup}>
                <label htmlFor="name">
                    Group Name:
                    <input 
                        type="text"
                        id="name"
                        placeholder="Enter Group Name"
                        maxLength="20"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </label>
                
                <button 
                    type="button"
                    onClick={() => setShowMemberSelector(true)}
                >
                    Select members
                </button>
                
                {selectedMembers.length > 0 && (
                    <div>
                        <h4>Selected Members:</h4>
                        <ul>
                            {selectedMembers.map(member => (
                                <li key={member.id}>{member.name}</li>
                            ))}
                        </ul>
                    </div>
                )}
                
                {showMemberSelector && (
                    <SelectedMembers
                        onClose={() => setShowMemberSelector(false)}
                        onMembersSelected={handleMembersSelected}
                    />
                )}
                
                {(error || contextError) && (
                    <div className="error">{error || contextError}</div>
                )}
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Group'}
                </button>
            </form>
        </>
    );
};

export default NewGroup;
