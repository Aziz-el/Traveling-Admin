import {create} from 'zustand';
import {
    fetchUsers as fetchUsersService,
    getUserById,
    updateUser as updateUserService,
    deleteUser as deleteUserService,
} from './services/user';
import { UserItem } from './types';


interface UserStore {
    users: UserItem[];
    fetchUsers: () => Promise<void>;
    getUser: (id: number | string) => Promise<UserItem | null>;
    updateUser: (id: number | string, updatedData: Partial<UserItem>) => Promise<UserItem | null>;
    deleteUser: (id: number | string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    fetchUsers: async () => {
        try {
            const data = await fetchUsersService();
            set({ users: data.items || [] });
        }
        catch (error) {
            console.error("Failed to fetch users:", error);
        }
    },
    getUser: async (id: number | string) => {
        try {
            const user = await getUserById(id);
            return user;
        }
        catch (error) {
            console.error(`Failed to get user with id ${id}:`, error);
            return null;
        }
    },
    updateUser: async (id: number | string, updatedData: Partial<UserItem>) => {
        try {
            const updated = await updateUserService(id, updatedData);
            set((state) => ({
                users: state.users.map(u => (u.id === updated.id ? updated : u))
            }));
            return updated;
        }
        catch (error) {
            console.error(`Failed to update user with id ${id}:`, error);
            return null;
        }
    },
    deleteUser: async (id: number | string) => {
        try {
            await deleteUserService(id);
            set((state) => ({
                users: state.users.filter(u => u.id !== id)
            }));
        }
        catch (error) {
            console.error(`Failed to delete user with id ${id}:`, error);
        }
    },
}));