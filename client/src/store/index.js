import { proxy } from 'valtio';

const state = proxy({
    logedIn: false,
    currentPage: 'home', // Default page
    color: '#EFBD48',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export const setPage = (page) => {
    state.currentPage = page;
};

export default state;