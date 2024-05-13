import { create } from 'zustand';

type BearState = {
    email: string;
    user: string; 
    setEmail: (value: string) => void;
}

const useStore = create<BearState>()((set) => ({
    email: '',
    user: '', 
    setEmail: (value: string) => set({email: value}),
}))

export default useStore;