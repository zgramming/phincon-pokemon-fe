import { MyPokemonInterface } from '@/interfaces/my-pokemon.interface';
import { KEY_MY_POKEMON_LOCAL_STORAGE } from '@/utils/constant';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MyPokemonState {
  items: MyPokemonInterface[];
  findPokemon: (id: number) => MyPokemonInterface | undefined;
  isAlreadyCaught: (id?: number) => boolean;
  catchPokemon: (pokemon: MyPokemonInterface) => void;
  releasePokemon: (id: number) => void;
  renamePokemon: (id: number, newName: string, currentFibonacci: number[]) => void;
}

export const useMyPokemonStore = create<MyPokemonState>()(
  persist(
    (set, get) => {
      return {
        items: [],

        findPokemon: (id: number) => {
          const result = get().items.find((item) => item.id === id);
          return result;
        },
        isAlreadyCaught: (id?: number) => {
          const result = get().items.some((item) => item.id === id) || false;
          return result;
        },

        catchPokemon: (pokemon: MyPokemonInterface) =>
          set((state) => {
            const result = [...state.items, pokemon];

            return { items: result };
          }),
        releasePokemon: (id: number) =>
          set((state) => {
            const result = state.items.filter((item) => item.id !== id);

            return { items: result };
          }),
        renamePokemon: (id: number, newName: string, currentFibonacci: number[]) =>
          set((state) => {
            const result = state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    nickname: newName,
                    fibonnaciSequence: currentFibonacci,
                    totalRename: item.totalRename + 1,
                    updatedAt: new Date().toISOString(),
                  }
                : item,
            );

            return {
              items: result,
            };
          }),
      };
    },
    {
      name: KEY_MY_POKEMON_LOCAL_STORAGE,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
