import { reactive } from 'vue';

// Global state to hold the token

// Function to set the token in the state
export function setToken(restoken:string) {
    const token = 'Bearer ' + restoken;
    localStorage.setItem('auth_token', token)
}

// Function to get the token from the state
export function getToken() {
    const storedToken = localStorage.getItem('auth_token');
    return storedToken || '';
}
export function removeToken() {
    localStorage.removeItem('auth_token'); // Remove token from localStorage
}