import { create } from 'zustand';

const useModalStore = create((set) => ({
    type: null,
    data: {},
    isOpen: false,

    onOpen: (type, data = {}) => set({type, data, isOpen: true,}),
    onClose: () => set({type: null, data: {}, isOpen: false}),
}));

export default useModalStore;