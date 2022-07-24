import create from 'zustand';
import { User } from '../common';

export interface State {
  user: User | null;
  login(email: string, password: string): void;
  register(user: User): void;
  logout(): void;
}

export const useStore = create<State>((set) => ({
  user: null,
  login(email: string, password: string) {
    const user = {
      id: '1',
      email,
      password,
      name: 'John Doe',
    };

    set((state) => ({ ...state, user }));
  },
  register(user: User) {
    set((state) => ({ ...state, user }));
  },
  logout() {
    set((state) => ({ ...state, user: null }));
  },
}));
