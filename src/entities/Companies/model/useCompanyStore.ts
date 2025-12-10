import { create } from 'zustand';
import { Tour } from '../../../app/App';

type CompaniesState = {
  companies: string[];
  setCompanies: (list: string[]) => void;
  addCompany: (name: string) => void;
  renameCompany: (oldName: string, newName: string) => void;
  removeCompany: (name: string) => void;
  syncWithTours: (tours?: Tour[]) => void;
};

const STORAGE_KEY = 'companies';

const readInitial = (tours?: Tour[]) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as string[];
    }
  } catch {}

  const defaults = ['GitLens Travel', 'Aviasales Tours'];
  if (tours && tours.length > 0) {
    return Array.from(new Set(tours.map(t => t.company).concat(defaults)));
  }
  return defaults;
};

export const useCompaniesStore = create<CompaniesState>((set, get) => ({
  companies: readInitial(),
  setCompanies: (list: string[]) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
    set({ companies: list });
  },
  addCompany: (name: string) => {
    const prev = get().companies;
    if (!prev.includes(name)) {
      const next = [...prev, name];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      set({ companies: next });
    }
  },
  renameCompany: (oldName: string, newName: string) => {
    const prev = get().companies;
    const next = prev.map(c => (c === oldName ? newName : c));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    set({ companies: next });
  },
  removeCompany: (name: string) => {
    const prev = get().companies;
    const next = prev.filter(c => c !== name);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    set({ companies: next });
  },
  syncWithTours: (tours?: Tour[]) => {
    try {
      const storedRaw = localStorage.getItem(STORAGE_KEY);
      const stored = storedRaw ? JSON.parse(storedRaw) : [];
      const fromTours = tours && tours.length > 0 ? Array.from(new Set(tours.map(t => t.company))) : [];
      const merged = Array.from(new Set([...(Array.isArray(stored) ? stored : []), ...fromTours, 'GitLens Travel', 'Aviasales Tours']));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      set({ companies: merged });
    } catch {
      // ignore
    }
  }
}));

export default useCompaniesStore;
