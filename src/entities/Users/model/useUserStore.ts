import {create} from 'zustand';
import { UserItem } from './types';

interface UserStore {
    users: UserItem[];
    setUsers: (users: UserItem[]) => void;
    
}