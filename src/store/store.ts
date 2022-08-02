import create from 'zustand';
import { User } from 'common';

export interface State {
  user: User | null;
  errors: string[];
  login(email: string, password: string): void;
  register(user: User): void;
  logout(): void;
  clearErrors(): void;
}

const Users = [] as User[];

const testUser: User = {
  email: 'domcodespoti@gmail.com',
  password: '123456',
  name: 'Dominic',
  id: '1',
  workouts: [{
    id: '1',
    time: new Date(),
    activities: [{
      id: '1',
      name: 'Squat',
      description: 'Squat',
      muscles: ['quadriceps', 'hamstrings'],
      reps: 5,
      sets: 3,
      weight: 120,
      type: 'strength',
    },
    {
      id: '2',
      name: 'Bench Press',
      description: 'Bench Press',
      muscles: ['chest', 'triceps'],
      reps: 5,
      sets: 5,
      weight: 100,
      type: 'strength',
    }],
    past: true,
    completed: true,
  },
  {
    id: '3',
    time: new Date(new Date().getTime() - (1000 * 60 * 60 * 24 * 7)),
    activities: [{
      id: '1',
      name: 'Sprint',
      description: 'Sprint',
      duration: 60,
      distance: 5,
      type: 'cardio',
    }],
    past: true,
    completed: true,
  }],
};

export const useStore = create<State>((set) => ({
  user: testUser,
  errors: [],
  login(email: string, password: string) {
    const foundUser = Users.find((user) => user.email === email && user.password === password);

    if (foundUser) {
      set((state) => ({ ...state, user: foundUser }));
    } else {
      set((state) => ({ ...state, errors: ['Invalid email or password'] }));
    }
  },
  register(user: User) {
    Users.push(user);
    set((state) => ({ ...state, user }));
  },
  logout() {
    set((state) => ({ ...state, user: null }));
  },
  clearErrors() {
    set((state) => ({ ...state, errors: [] }));
  },
}));
