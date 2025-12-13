import { create } from 'zustand';

interface Store {
  activeCommunity: string | null;
  setActiveCommunity: (communityId: string | null) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (isOpen: boolean) => void;
  // Accepte 'up', 'down' ou undefined (pas de vote)
  userVotes: Record<string, 'up' | 'down' | undefined>;
  toggleVote: (postId: string, vote: 'up' | 'down') => void;
}

export const useStore = create<Store>((set) => ({
  activeCommunity: '1',
  setActiveCommunity: (communityId) => set({ activeCommunity: communityId }),
  isCreatePostOpen: false,
  setIsCreatePostOpen: (isOpen) => set({ isCreatePostOpen: isOpen }),
  userVotes: {},
  toggleVote: (postId, vote) => 
    set((state) => ({
      userVotes: {
        ...state.userVotes,
        [postId]: state.userVotes[postId] === vote ? undefined : vote,
      },
    })),
}));