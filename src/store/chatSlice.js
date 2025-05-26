import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChat: null,
  activeBooking: null,
  chats: [],
  bookings: [],
  searchTerm: "",
  loading: false,
  error: null,
  currentUserId: null,
  loadingMessages: false,
  pageNo: 1,
  hasMoreChats: true,
  chatMessagePageNo: 1,
  hasMoreChatMessages: true,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.pageNo += 1;
    },
    setHasMoreChats: (state, action) => {
      state.hasMoreChats = action.payload;
    },
    resetPagination: (state) => {
      state.pageNo = 1;
      state.hasMoreChats = true;
    },
    incrementChatMessagePage: (state) => {
      state.chatMessagePageNo += 1;
    },
    setHasMoreChatMessages: (state, action) => {
      state.hasMoreChatMessages = action.payload;
    },
    resetChatMessagePagination: (state) => {
      state.chatMessagePageNo = 1;
      state.hasMoreChatMessages = true;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },

    // Set the list of chats (from initial fetch)
    setChats: (state, action) => {
      const incomingChats = action.payload;

      // Prepare incoming chats with consistent format
      const preparedIncomingChats = incomingChats.map((chat) => ({
        id: chat.chatId || chat.id,
        vendorName: chat.chatName || chat.vendorName,
        profileImg: chat.displayPicture || chat.profileImg,
        latestMessage: chat.latestMessage,
        latestMessageSentAt: chat.latestMessageSentAt,
        unreadCount: chat.unreadCount || 0,
        isRead: chat.isRead || false,
        isDelivered: chat.isDelivered || false,
        chatType: chat.chatType || "contact",
        messages: [],
      }));

      const existingChatsMap = new Map(
        state.chats.map((chat) => [chat.id, chat])
      );

      const mergedChats = [...state.chats]; // Preserve existing chats

      preparedIncomingChats.forEach((incomingChat) => {
        if (!existingChatsMap.has(incomingChat.id)) {
          mergedChats.push(incomingChat);
        }
      });

      state.chats = mergedChats;
    },

    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setActiveBooking: (state, action) => {
      state.activeBooking = action.payload;
    },

    // Add a new message to a chat
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        const messageExists = chat.messages.some(
          (msg) => msg.id === message.id
        );
        if (!messageExists) {
          chat.messages.push(message);
          chat.latestMessage = message.text;
          chat.latestMessageSentAt = message.date;
        }
      }
    },

    // Set the search term for filtering chats
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // Set the bookings for the active chat
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },

    // Set messages for a specific chat
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;

      const chat = state.chats.find((chat) => chat.id === chatId);

      if (chat) {
        const newMessages = messages.map((msg) => ({
          id: msg.messageId,
          text: msg.content,
          date: new Date(msg.latestMessageSentAt || msg.sentAt).toLocaleString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
          sender:
            msg.sender?.fullName ??
            (msg.senderType === "user" ? "You" : "Vendor"),
          isReceived: state.currentUserId
            ? msg.sender?._id !== state.currentUserId
            : msg.senderType !== "user",
          profileImg: msg.sender?.profilePicture || "",
          channel: msg.contentDescriptionType || "App",
        }));

        const existingMessageIds = chat.messages.map((message) => message.id);
        const uniqueNewMessages = newMessages.filter(
          (newMsg) => !existingMessageIds.includes(newMsg.id)
        );

        state.chats = state.chats.map((chat) =>
          chat.id === chatId
            ? { ...chat, messages: [...uniqueNewMessages, ...chat.messages] }
            : chat
        );
      }
    },

    addOrUpdateChat: (state, action) => {
      const chatData = action.payload;
      const existingChatIndex = state.chats.findIndex(
        (chat) => chat.id === chatData.chatId
      );

      const newChat = {
        id: chatData.chatId,
        vendorName: chatData.chatName,
        profileImg: chatData.displayPicture,
        latestMessage: chatData.latestMessage,
        latestMessageSentAt: chatData.latestMessageSentAt,
        unreadCount: chatData.unreadCount || 0,
        isRead: chatData.isRead || false,
        isDelivered: chatData.isDelivered || false,
        chatType: chatData.chatType || "contact",
        messages: [],
      };

      if (existingChatIndex !== -1) {
        // 🔁 Only update data if vendorName or displayPicture match
        const existingChat = state.chats[existingChatIndex];
        if (
          existingChat.vendorName === chatData.chatName &&
          existingChat.profileImg === chatData.displayPicture
        ) {
          state.chats[existingChatIndex] = {
            ...existingChat,
            latestMessage: chatData.latestMessage,
            latestMessageSentAt: chatData.latestMessageSentAt,
            unreadCount: chatData.unreadCount || existingChat.unreadCount,
          };
        } else {
          // 🚨 Otherwise, treat as a new distinct chat
          state.chats.unshift(newChat);
        }
      } else {
        state.chats.unshift(newChat);
      }
    },
    addChatsPaginated: (state, action) => {
      const newChats = action.payload;

      const existingIds = new Set(state.chats.map((chat) => chat.id));

      const filteredNewChats = newChats.filter((chat) => {
        const id = chat.chatId || chat.id;
        return !existingIds.has(id);
      });

      const preparedChats = filteredNewChats.map((chatData) => ({
        id: chatData.chatId || chatData.id,
        vendorName: chatData.chatName || chatData.vendorName,
        profileImg: chatData.displayPicture || chatData.profileImg,
        latestMessage: chatData.latestMessage,
        latestMessageSentAt: chatData.latestMessageSentAt,
        unreadCount: chatData.unreadCount || 0,
        isRead: chatData.isRead || false,
        isDelivered: chatData.isDelivered || false,
        chatType: chatData.chatType || "contact",
        messages: [],
      }));

      state.chats = [...state.chats, ...preparedChats];
    },

    resetUnreadCount: (state, action) => {
      const chatId = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.unreadCount = 0;
      }
    },

    clearMessages: (state, action) => {
      const chat = state.chats.find((chat) => chat.id === action.payload);
      if (chat) {
        chat.messages = [];
      }
    },

    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingMessages: (state, action) => {
      state.loadingMessages = action.payload;
    },

    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Reset chat state
    resetChatState: () => initialState,
  },
});

export const {
  setChats,
  setActiveChat,
  addMessage,
  setSearchTerm,
  setBookings,
  addOrUpdateChat,
  setMessages,
  clearMessages,
  setLoading,
  setError,
  resetChatState,
  setCurrentUserId,
  setLoadingMessages,
  resetUnreadCount,
  incrementPage,
  setHasMoreChats,
  resetPagination,
  addChatsPaginated,
  incrementChatMessagePage,
  setHasMoreChatMessages,
  resetChatMessagePagination,
  setActiveBooking,
  activeBooking,
} = chatSlice.actions;

export default chatSlice.reducer;
