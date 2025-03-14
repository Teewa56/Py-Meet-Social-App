import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// auth routes
export const signUp = (data) => api.post('/signup', data);
export const login = (data) =>  api.post('/login', data);
export const logout = () => api.post('/logout');
export const deleteAccount = (userId) => {
    const token = localStorage.getItem('token');
    return api.delete('/delete_account', {params : {userId}}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
export const setupProfile = (data) =>{ 
    const token = localStorage.getItem('token');
    return api.post('/setup_profile', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    });
};
export const editProfile = (data) => {
    const token = localStorage.getItem('token');
    return api.put('/edit_profile', data, {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'application/json'
        }
    });
};

// user routes
export const searchUser = (query) => api.get(`/search/`, { params: { query } });
export const followUser = (userId, followId) => api.post(`/follow/${followId}`, { userId }); 
export const unfollowUser = (userId, unfollowId) => api.post(`/unfollow/${unfollowId}`, { userId });
export const getFollowing = (userId) => api.get(`/following/${userId}`, { params: { userId } });
export const getFollowers = (userId) => api.get(`/followers/${userId}`, { params: { userId } });
export const getUserProfile = (userId) => api.get(`/profile/${userId}`, { params: { userId } } );

// image upload
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pymeet');
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
    return response.data.secure_url;
};

//posts routes
export const postText = (postText, posterId) => api.post(`/postText`, {postText, posterId });
export const postImage  = (data, posterId) => api.post(`/postImage`, {data, posterId});
export const likePost = (likerId, postId) => api.post(`/likePost/${postId}`, {likerId});
export const unlikePost = (unlikerId, postId) => api.post(`/unlikePost/${postId}`, {unlikerId}); 
export const editPost = (data, postId, editerId) => api.put(`/editPost/${postId}`, {data, editerId});
export const deletePost = (deleterId, postId) => api.delete(`/deletePost/${postId}?deleterId=${deleterId}`);
export const getPostById = (postId) => api.get(`/getPost/${postId}`);


//get all posts
export const allPosts = () => api.get('/allPosts');

//comments
export const makeComment = (postId, commenterId, comment) => 
    api.post(`/${postId}/makeComment`, { commenterId, comment });

export const likeComment = (commentId, userId) => 
    api.post(`/${commentId}/likeComment`, { userId });

export const unlikeComment = (commentId, userId) => 
    api.post(`/${commentId}/unlikeComment`, { userId });

export const deleteComment = (commentId, userId) => 
    api.delete(`/${commentId}/deleteComment`, { data: { userId } });

export const editComment = (commentId, userId, newComment) => 
    api.put(`/${commentId}/editComment`, { userId, comment: newComment });
export const getCommentById = (commentId) => api.get(`/${commentId}/getComment`);  

//chats
export const getMessages = (userId1, userId2) => api.get(`/messages/${userId1}/${userId2}`);
export const getLastMessages = () => api.get("/messages/last");
export const sendMessage = (message) => api.post("/messages/send", message);
export const deleteMessage = (messageId) => api.delete(`/messages/${messageId}`);

//group
export const createGroup = (data) => api.post('/create', data);
export const editGroup = (data, groupId, editerId) => api.put(`/edit/${groupId}`, data , {params : {groupId, editerId}})
export const updateMembers = (data, groupId) => api.put(`/updateMembers/${groupId}`, data, {params : {groupId}})
export const sendGroupMessage = (data, groupId, senderId) => api.post(`/sendMessage/${groupId}`, data, {params : {senderId, groupId}} )
export const deleteGroup = (deleterId, groupId) => api.delete(`/deleteGroup/${groupId}`, { params : {deleterId, groupId}});

//notificationroutes
export const createNotification = (data) => api.post('/create', data);
export const getNotifications = (userId) => api.get(`/get/${userId}`, {params : {userId}});
export const markNotification = (id) => api.put(`/markAsRead/${id}`, {params : {id}});
export const deleteNotification = (id) => api.delete(`/delete/${id}`, {params : {id}});
export const getUnread = (userId) => api.get(`/getUnread/${userId}`, {params : {userId}});

export default api;