import {ActionReducerMapBuilder, createSlice} from '@reduxjs/toolkit';
import {ChatUser} from '../../types/ChatUser';
import {fetchChatFeed, fetchChatMessages} from '../apiCalls/chat';
import {ChatMessage} from '../../types/ChatMessage';

interface ChatFeedState {
  isLoadingFeed: boolean;
  isLoadingFeedError: any;
  feed: Array<ChatUser>;
  isLoadingMessages: boolean;
  isLoadingMessagesError: string;
  messages: Array<ChatMessage>;
}

const initialState: ChatFeedState = {
  isLoadingFeed: false,
  isLoadingFeedError: '',
  feed: [],
  isLoadingMessages: false,
  isLoadingMessagesError: '',
  messages: [],
};

const chatFeedSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    appendMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ChatFeedState>) => {
    builder.addCase(fetchChatFeed.pending, (state, _) => {
      state.isLoadingFeed = true;
      state.isLoadingFeedError = '';
      state.feed = [];
    });
    builder.addCase(fetchChatFeed.rejected, (state, action) => {
      state.isLoadingFeed = false;
      state.isLoadingFeedError = action.payload;
      state.feed = [];
    });
    builder.addCase(fetchChatFeed.fulfilled, (state, action) => {
      state.isLoadingFeed = false;
      state.isLoadingFeedError = '';
      state.feed = action.payload;
    });
    builder.addCase(fetchChatMessages.pending, (state, _) => {
      state.isLoadingMessages = true;
      state.isLoadingMessagesError = '';
      state.messages = [];
    });
    builder.addCase(fetchChatMessages.rejected, (state, action) => {
      state.isLoadingMessages = false;
      state.isLoadingMessagesError = action.payload as string;
      state.messages = [];
    });
    builder.addCase(fetchChatMessages.fulfilled, (state, action) => {
      state.isLoadingMessages = false;
      state.isLoadingMessagesError = '';
      state.messages = action.payload;
    });
  },
});

export default chatFeedSlice.reducer;
export const {appendMessage} = chatFeedSlice.actions;
