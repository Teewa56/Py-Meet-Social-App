import { createContext, useState, useEffect } from "react";
import { postImage, postText, editPost, likePost, unlikePost, deletePost } from "../Services/api";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const PostContext = createContext();

const PostProvider = ({ children }) => {
    PostProvider.propTypes = {
        children : PropTypes.node.isRequired
    }   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [postToEdit, setPostToEdit] = useState(null);
    const [navigateEditpage, setNavigateEditPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(navigateEditpage && postToEdit){
            navigate(`/NewPostPage?postId=${postToEdit}`)
        }      
    }, [navigateEditpage, postToEdit, navigate])
    

    const PostText = async(post, posterId) => {
        setLoading(true);
        try {
            const res = await postText(post, posterId)
            return res.data;
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false);
        }
    };

    const PostImage = async(data, posterId) => {
        setLoading(true);
        try {
            const res = await postImage(data, posterId)
            return res.data;            
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false);
        }
    };

    const triggerEditNavigation = (postId) => {
        setPostToEdit(postId);
        setNavigateEditPage(true);
    }

    const EditPost = async (data, editerId, postId) => {
        setLoading(true);
        try {
            const res = await editPost(data, editerId, postId);
            return(res.data);
        }catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const LikePost = async (likerId, postId) => {
        setLoading(true);
        try {
            const res = await likePost(likerId, postId)
            return res;
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false);
        }   
    } 

    const UnlikePost = async (unlikerId, postId) => {
        setLoading(true);
        try {
            const res = await unlikePost(unlikerId, postId)
            return res;
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false);
        }   
    }

    const DeletePost = async (deleterId, postId) => {
        setLoading(true);
        try {
            const res = await deletePost(deleterId, postId)
            return res;
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false);
        }   
    }

    return(
        <PostContext.Provider value={{PostText, PostImage, EditPost, DeletePost, LikePost, UnlikePost, triggerEditNavigation, navigateEditpage, error, loading}}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider};