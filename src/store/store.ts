import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userslice.slice'; // No need for ".ts" extension

// Define UserState interface
interface UserState {
  isauthenticated: boolean;
  email: string;
  username: string;
  avatar: string | null;
  accesstoken: string | null;
  refreshtoken: string | null;
  // other user-related properties
}

// Define RootState by combining all slice states
interface RootState {
  user: UserState;
  // other slice states if present
}

// Configure Redux store with reducers and initial state
const store = configureStore({
  reducer: {
    user: userReducer,
    // other reducers if present
  },
  // Optional: Provide preloadedState if needed
  // preloadedState: initialState,
  // Add middleware or other store configurations as needed
});

export default store;
export type { RootState }