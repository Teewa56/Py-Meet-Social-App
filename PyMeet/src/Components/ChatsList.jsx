import PropTypes from 'prop-types';

const ChatsList = ({ activeUsers, onSelectUser, selectedUser }) => {
  return (
    <div className="users-list">
      <h2 className='font-bold text-2xl' >Recent Chats</h2>
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
    </div>
  );
};

ChatsList.propTypes = {
  activeUsers: PropTypes.array.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  selectedUser: PropTypes.object
};

export default ChatsList;