export const selectActiveChatId = (chat_id,option) => ({
        type: "selectActiveChatId",
        chat_id: chat_id,
        option_type: option
});
export const activateUser = (user_id) => ({
        type: "activateUser",
        user_id: user_id
});
export const deactivateUser = (user_id) => ({
        type: "deactivateUser",
        user_id: user_id
});
export const showChannel = (channel_id,option) => ({
        type: "showChannel",
        channel_id: channel_id,
        option_type: option
});
export const hideChannel = (channel_id,option) => ({
        type: "hideChannel",
        channel_id: channel_id,
        option_type: option
});
export const addChannel = (name, parent_id, created_at) => ({
        type: "addChannel",
        name: name,
        parent_id: parent_id,
        created_at: created_at
});
export const changeChannelName = (id, name) => ({
        type: "changeChannelName",
        name: name,
        id: id
});
export const addChannelMember = (id, user_id) => ({
        type: "addChannelMember",
        user_id: user_id,
        id: id
});
export const removeChannelMember = (id, user_id) => ({
        type: "removeChannelMember",
        user_id: user_id,
        id: id
});
export const addMessage = (id, text) => ({
        type: "addMessage",
        text: text,
        id: id
});
export const addDirectMessage = (user_id, text) => ({
        type: "addDirectMessage",
        text: text,
        user_id: user_id
});