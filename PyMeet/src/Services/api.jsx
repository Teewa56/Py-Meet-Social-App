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
export const searchUser = (query) => api.get(`/search/${query}`, { params: { query } });
export const followUser = (userId, followId) => api.post(`/follow/${followId}`, { userId });
export const unfollowUser = (userId, unfollowId) => api.post(`/unfollow/${unfollowId}`, { userId });
export const getFollowing = (userId) => api.get(`/${userId}/following`, { params: { userId } });
export const getFollowers = (userId) => api.get(`/${userId}/followers`, { params: { userId } });
export const getUserProfile = (userId) => api.get(`/${userId}/profile`, { params: { userId } });
export const getUserLikedPosts = (userId) => api.get(`/${userId}/likedPosts`, { params : {userId} });
export const getUserPosts = (userId) => api.get(`/${userId}/Posts`, { params : {userId} });

// image upload
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pymeet');
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
    return response.data.secure_url;
};

//posts routes
export const postText = (data, posterId) => api.post(`/${posterId}/postText`, data, { params : { posterId }});
export const postImage  = (data, posterId) => api.post(`/${posterId}/postImage`, data, {params : {posterId}});
export const likePost = (likerId, postId) => api.post(`/${postId}/likePost`, {params : {likerId, postId}});
export const unlikePost = (unlikerId, postId) => api.post(`/${postId}/unlikePost`, { params : { unlikerId, postId}}); 
export const editPost = (data, postId, editerId) => api.put(`/${postId}/editPost`, data , { params : {postId, editerId}});
export const deletePost = (deleterId, postId) => api.delete(`/${postId}/deletePost`, { params : {deleterId, postId}});

//get all posts
export const allPosts = () => api.get('/allPosts');

//commentRoutes
export const makeComment = (postId, commenterId, comment) => api.post(`/${postId}/makeComment`, comment, {params : { commenterId, postId }});
export const likeComment = (commentId, likerId) => api.post(`/${commentId}/likeComment`, { params : { likerId, commentId }});
export const unlikeComment = (commentId, unlikerId) => api.post(`/${commentId}/unlikeComment`, { params : { unlikerId, commentId }});
export const deleteComment = (commentId, deleterId) => api.delete(`/${commentId}/deleteComment`, { params : {commentId, deleterId }});
export const editComment = (commentId, editerId, comment) => api.put(`/${commentId}/editComment`, comment, {params : {editerId, commentId }});  

//chatRoutes
export const sendMessage = (message) => api.post('/send', message);
export const getMessages = (userId1, userId2) => api.get(`/getMessages/${userId1}/${userId2}`, {params : { userId1, userId2 }});
export const getLastMessage = () => api.get('/getLastMessages');
export const editMessage = (id, message) => api.put(`/edit/${id}`, message, {params : { id }});
export const deleteMessage = (id) => api.delete(`/delete/${id}`, {params : {id}});

//groupRoutes
export const createGroup = (data) => api.post('/create', data);
export const editGroup = (data, groupId, editerId) => api.put(`/edit/${groupId}`, data , {params : {groupId, editerId}})
export const updateMembers = (data, groupId) => api.put(`/updateMembers/${groupId}`, data, {params : {groupId}})
export const sendGroupMessage = (data, groupId, senderId) => api.post(`/sendMessage/${groupId}`, data, {params : {senderId, groupId}} )
export const deleteGroup = (deleterId, groupId) => api.delete(`/deleteGroup/${groupId}`, { params : {deleterId, groupId}});

//notificationroutes
export const createNotification = (data) => api.post('/create', data);
export const getNotification = (userId) => api.get(`/get/${userId}`, {params : {userId}});
export const markNotification = (id) => api.put(`/markAsRead/${id}`, {params : {id}});
export const deleteNotification = (id) => api.delete(`/delete/${id}`, {params : {id}});
export const getUnread = (userId) => api.get(`/getUnread/${userId}`, {params : {userId}});

export default api;