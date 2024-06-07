import { create } from 'zustand';

type BearState = {
    email: string;
    name: string;
    lastName: string;
    userId: number/* | null*/;
    role:string; 
    setEmail: (value: string) => void;
    setName: (value: string) => void;
    setLastName: (value: string) => void;
    setRole: (value: string) => void;
    setUserId: (value: number/* | null*/) => void,
}

const useStore = create<BearState>()((set) => ({
    email: '',
    name: '',
    lastName: '',
    role: '',
    userId: /*null*/0, 
    setEmail: (value: string) => set({email: value}),
    setUserId: (value: number /* | null*/) => set({userId: value}),
    setName: (value: string) => set({name: value}),
    setRole: (value: string) => set({role: value}),
    setLastName: (value: string) => set({lastName: value}),

}))

export default useStore;