import { create } from 'zustand';

type BearState = {
    latitude: string;
    longitude: string;
    setLatitude: (value: string) => void,
    setLongitude: (value: string) => void,
}

const locationStore = create<BearState>()((set) => ({
    latitude:  '',
    longitude: '',
    setLatitude: (value: string) => set({latitude: value}),
    setLongitude: (value: string) => set({longitude: value}),
}))

export default locationStore;