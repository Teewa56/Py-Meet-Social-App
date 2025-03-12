const Group = require('../Model/groupModel');
const Chat = require('../Model/chatModel');
const User = require('../Models/userController');

// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        //also add the members
        await group.save();
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit group details (name or description)
exports.editGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedGroup = await Group.findByIdAndUpdate(
            id,
            { name: req.body.name, description: req.body.description },
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.status(200).json(updatedGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add or remove members or admins
exports.updateGroupMembers = async (req, res) => {
    try {
        const { id } = req.params;
        const { addMembers, removeMembers, addAdmins, removeAdmins } = req.body;

        const group = await Group.findById(id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Add or remove members
        if (addMembers) {
            group.members.push(...addMembers);
        }
        if (removeMembers) {
            group.members = group.members.filter(
                (member) => !removeMembers.includes(member.toString())
            );
        }

        // Add or remove admins
        if (addAdmins) {
            group.admins.push(...addAdmins);
        }
        if (removeAdmins) {
            group.admins = group.admins.filter(
                (admin) => !removeAdmins.includes(admin.toString())
            );
        }

        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Send a group message
exports.sendGroupMessage = async (req, res) => {
    try {
        const { groupId, senderId } = req.params;
        const { content } = req.body;

        const group = await Group.findById(groupId);
        const sender = await User.findById(senderId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const message = new Chat({
            sender,
            content,
            receiver: group.members, // Send message to all group members
        });

        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGroup = async (req, res) => {
    try {
        const { groupId, deleterId } = req.params;
        const group = Group.findById({groupId});
        const admins = group.admins;
        if(!admins.includes(deleterId)) return res.status(400).json({ msg : "Only admin can delete group"}),
        await findByIdAndDelete(groupId);
        res.status(200).json({ msg : "Deleted successfully!"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
