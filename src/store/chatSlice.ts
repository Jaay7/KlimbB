import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chat {
  id: number;
  username: string;
  usermsg: string;
  botname: string;
  botmessage: string;
}

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (
      state,
      action: PayloadAction<{
        username: string;
        usermsg: string;
        botname: string;
        botmessage: string;
      }>
    ) => {
      state.chats.push({
        id: state.chats.length,
        username: action.payload.username,
        usermsg: action.payload.usermsg,
        botname: action.payload.botname,
        botmessage: action.payload.botmessage,
      });
    },
  },
});

export default chatSlice.reducer;
export const { addChat } = chatSlice.actions;
