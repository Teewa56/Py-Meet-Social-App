import { createContext, useState } from "react";
import { setupProfile as setupProfileApi, followUser, editProfile as editProfileApi, searchUser as searchUserApi, unfollowUser } from "../Services/api";
import PropTypes from 'prop-types';
const UserContext = createContext();

const UserProvider = ({ children }) => {
    UserProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const setUpProfile = async (data) => {
        setLoading(true);
        try {
            const res =  await setupProfileApi(data);
            updateStoredUser(res.data.user);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const editProfile = async (data) => {
        setLoading(true);
        try {
            const res = await editProfileApi(data);
            updateStoredUser(res.data.user);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const updateStoredUser = async (userProfile) => {
        await localStorage.setItem('user', JSON.stringify(userProfile));
    }

    const searchaUser = async (query) => {
        setLoading(true);
        try{
            const res = await searchUserApi(query);
            setLoading(false);
            return res.data;
        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    };

    const followuser = async (userId, followId) => {
        setLoading(true);
        try{
            const res = await followUser(userId, followId);
            setLoading(false);
            return res.data;
        } catch(error){
            setError(error.response.data.msg);
            setLoading(false);
        }
    }

    const unFollowUser = async(userId, unfollowId) => {
        setLoading(true);
        try{
            const res = await unfollowUser(userId, unfollowId);
            setLoading(false);
            return res.data;
        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    };

    //getliked posts from api
    //get userposts from api 

    return (
        <UserContext.Provider 
        value={{ setUpProfile, editProfile, followuser,
         loading, error, unFollowUser, updateStoredUser,
         searchaUser, 
        }}>
            {children}
        </UserContext.Provider>
    );
};
export { UserProvider, UserContext };