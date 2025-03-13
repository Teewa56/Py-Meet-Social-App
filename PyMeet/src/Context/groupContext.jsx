import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import { sendGroupMessage, updateMembers, deleteGroup, editGroup, createGroup } from "../Services/api";

const GroupContext = createContext();

const GroupProvider = ({ children }) => {

    GroupProvider.propTypes = {
        children : PropTypes.node.isRequired
    }

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(null);

    const SendGroupMessage = async(groupId, senderId, data) => {
        setloading(true);
        try {
            const res = await sendGroupMessage(groupId, senderId, data);
            return res;
        } catch (error) {
            seterror(error.message);
        }
        setloading(false);
    };

    const CreateGroup = async(data) => {
        setloading(true);
        try {
            const res = await createGroup(data);
            return res;
        } catch (error) {
            seterror(error.message);
        }
        setloading(false);
    };

    const EditGroupInfo = async(groupId, editerId, data) => {
        setloading(true);
        try {
            const res = await editGroup(groupId, editerId, data);
            return res;
        } catch (error) {
            seterror(error.message);
        }
        setloading(false);
    };

    const UpdateGroupMembers = async(groupId, data) => {
        setloading(true);
        try {
            const res = await updateMembers(groupId, data);
            return res;
        } catch (error) {
            seterror(error.message);
        }
        setloading(false);
    };

    const DeleteGroup = async(groupId, deleterId) => {
        setloading(true);
        try {
            const res = await deleteGroup(groupId, deleterId);
            return res;
        } catch (error) {
            seterror(error.message);
        }
        setloading(false);
    };

    return(
        <GroupContext.Provider value={{SendGroupMessage, CreateGroup, EditGroupInfo, UpdateGroupMembers, DeleteGroup, error, loading}} >
            {children}
        </GroupContext.Provider>
    )
}

export {GroupContext, GroupProvider};