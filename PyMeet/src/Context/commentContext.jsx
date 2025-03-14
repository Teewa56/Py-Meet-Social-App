import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { makeComment, likeComment, unlikeComment, editComment, deleteComment } from '../Services/api';

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const LikeComment = async (commentId, userId) => {
        setLoading(true);
        try {
            const res = await likeComment(commentId, userId);
            return res.data;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const UnlikeComment = async (commentId, userId) => {
        setLoading(true);
        try {
            const res = await unlikeComment(commentId, userId);
            return res.data;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
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
            return null;
        } finally {
            setLoading(false);
        }
    };

    const EditComment = async (commentId, userId, newComment) => {
        setLoading(true);
        try {
            const res = await editComment(commentId, userId, newComment);
            return res.data;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const DeleteComment = async (commentId, userId) => {
        setLoading(true);
        try {
            const res = await deleteComment(commentId, userId);
            return res.data;
        } catch (error) {
            setError(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return (
        <CommentContext.Provider value={{ 
            LikeComment, MakeComment, UnlikeComment, DeleteComment, EditComment, error, loading 
        }}>
            {children}
        </CommentContext.Provider>
    );
};

CommentProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export { CommentContext, CommentProvider };
