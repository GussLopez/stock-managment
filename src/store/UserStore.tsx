import { create } from "zustand";

interface UserState {
  id: string | null;
  email: string | null;
  nombres: string | null;
  setUser: (user: { id: string; email: string; nombres: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  email: null,
  nombres: null,

  setUser: (user) => set({
    id: user.id,
    email: user.email,
    nombres: user.nombres
  }),

  clearUser: () => set({
    id: null,
    email: null,
    nombres: null
  }),
}));