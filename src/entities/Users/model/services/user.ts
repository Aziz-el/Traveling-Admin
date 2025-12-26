import instance from "../../../../shared/lib/axios/axios";
import { UserItem, UsersResponse } from "../types";

export const fetchUsers = async (): Promise<UsersResponse> => {
    const response = await instance.get<UsersResponse>("/users/");
    return response.data;
};

export const getCurrentUser = async (): Promise<UserItem | null> => {
    const response = await instance.get<UserItem>("/users/");
    return response.data || null;
}

export const getUserById = async (id: number | string): Promise<UserItem> => {
    const response = await instance.get<UserItem>(`/users/${id}`);
    return response.data;
}

export const updateUser = async (id: number | string, payload: Partial<UserItem>): Promise<UserItem> => {
    const response = await instance.put<UserItem>(`/users/${id}/`, payload);
    return response.data;
}

export const deleteUser = async (id: number | string): Promise<void> => {
    await instance.delete(`/users/${id}/`);
};

export default {
    fetchUsers,
    getUserById,
    getCurrentUser,
    updateUser,
    deleteUser,
};