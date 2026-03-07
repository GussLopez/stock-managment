import { create } from "zustand";

interface BusinessState {
  id: string | null;
  name: string | null;
  owner_id: string | null;
  plan: string | null;
  created_at: string | null
  setBusiness: (business: {
    id: string;
    name: string;
    owner_id: string;
    plan: string;
    created_at: string;
  }) => void;
  clearBusiness: () => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  id: null,
  name: null,
  owner_id: null,
  plan: null,
  created_at: null,

  setBusiness: (business) =>
    set({
      id: business.id,
      name: business.name,
      owner_id: business.owner_id,
      plan: business.plan,
      created_at: business.created_at
    }),

  clearBusiness: () =>
    set({
      id: null,
      name: null,
      owner_id: null,
      plan: null,
    }),
}));
