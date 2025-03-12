import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { makeComment, likeComment, unlikeComment, editComment, deleteComment } from '../Services/api';

const CommentContext =  createContext();

const CommentProvider = ({children}) => {
    CommentProvider.propTypes = {
        children : PropTypes.node.isRequired
    };
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    const LikeComment = async (commentId, likerId) => {
        setLoading(true);
        try {
           const res = await likeComment(commentId, likerId);
           return res.data;
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const UnlikeComment = async (commentId, unlikerId) => {
        setLoading(true);
        try {
           const res = await unlikeComment(commentId, unlikerId);
           return res.data;
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const MakeComment = async (postId, commenterId, comment) => {
        setLoading(true);
        try {
           const res = await makeComment(postId, commenterId, comment);
           return res.data;
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const EditComment = async (commentId, editerId, comment) => {
        setLoading(true);
        try {
           if(canEdit){
                const res = await editComment(commentId, editerId, comment);
                return res.data;
           }
        }catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    const DeleteComment = async (commentId, deleterId) => {
        setLoading(true);
        try {
           const res = await deleteComment(commentId, deleterId);
           return res.data;
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    };

    return(
        <CommentContext.Provider value={{LikeComment, MakeComment, UnlikeComment, DeleteComment, EditComment, setCanEdit, canEdit, error, loading}}>
            {children}
        </CommentContext.Provider>
    )
};

export { CommentContext, CommentProvider };