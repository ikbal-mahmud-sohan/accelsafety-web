import { reactive } from 'vue';

// New ID functions

export function setUserId(id: number | string) {
    localStorage.setItem('user_id', id.toString());
}

export function getUserId(): number | null {
    const storedId = localStorage.getItem('user_id');
    return storedId ? parseInt(storedId) : null;
}

export function getUserIdString(): string {
    const id = localStorage.getItem('user_id');
    return id ? id : 'null'; // or '' if you prefer empty string
  }

export function removeUserId() {
    localStorage.removeItem('user_id');
}