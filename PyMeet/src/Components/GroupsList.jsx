import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { GroupContext } from "../Context/groupContext";

const GroupsList = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                // Implement API call to get user's groups
                const response = await fetch('/api/groups');
                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }
                
                const data = await response.json();
                setGroups(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchGroups();
    }, []);
    
    if (loading) {
        return <div>Loading groups...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (groups.length === 0) {
        return (
            <div className="empty-groups">
                <p>You don't have any groups yet.</p>
                <Link to="/groups/new" className="create-group-btn">
                    Create a group
                </Link>
            </div>
        );
    }
    
    return (
        <div className="groups-list">
            <div className="groups-header">
                <h2>Your Groups</h2>
                <Link to="/groups/new" className="create-group-btn">
                    New Group
                </Link>
            </div>
            
            <div className="groups-grid">
                {groups.map(group => (
                    <Link 
                        key={group._id} 
                        to={`/groups/${group._id}`}
                        className="group-card"
                    >
                        <div className="group-icon">
                            {/* Group icon or first letter of group name */}
                            {group.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="group-info">
                            <h3>{group.name}</h3>
                            <p>{group.members.length} members</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default GroupsList;