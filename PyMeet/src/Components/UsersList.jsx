// UsersList.jsx - Component to display active users and recent chats
import PropTypes from 'prop-types';

const UsersList = ({ activeUsers, onSelectUser, selectedUser }) => {
  return (
    <div className="users-list">
      <h2>Active Users</h2>
      <div className="active-users">
        {activeUsers.map(userId => (
          <div 
            key={userId}
            className={`user-item ${selectedUser?.id === userId ? 'selected' : ''}`}
            onClick={() => onSelectUser({ id: userId, name: `User ${userId}` })}
          >
            <div className="status-indicator online"></div>
            <span>User {userId}</span>
          </div>
        ))}
      </div>
      
      <h2>Recent Chats</h2>
      {/* Display recent chats here */}
    </div>
  );
};

UsersList.propTypes = {
  activeUsers: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.object
};

export default UsersList;