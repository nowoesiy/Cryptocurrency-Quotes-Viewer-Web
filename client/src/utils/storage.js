export const RISED_COIN = 'risedCoin';

export const storage = {
    getItem: (key) => {
        localStorage.getItem(key);
    },
    setItem: (key, value) => {
        localStorage.setItem(key, value);
    }
}