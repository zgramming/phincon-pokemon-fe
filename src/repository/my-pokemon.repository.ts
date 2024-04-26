import { BASE_API_URL } from '@/utils/constant';
import axios from '@/utils/http';

const http = axios(BASE_API_URL);

const fetch = {};

interface RenamePokemonResponseInterface {
  error: boolean;
  message: string;
  data: {
    currentFibonacci: number[];
    newName: string;
  };
}

interface CatchPokemonResponseInterface {
  error: boolean;
  message: string;
  data: boolean;
}

interface ReleasePokemonResponseInterface {
  error: boolean;
  message: string;
  number: number;
  data: boolean;
}

interface RenamePokemonDTO {
  sequenceFibonnaci: number[];
  newName: string;
}

const action = {
  async catchPokemon(name: string) {
    const response = await http.post(`/pokemon/catch/${name}`, {}, undefined);
    const data = response.data as CatchPokemonResponseInterface;
    return data;
  },

  async renamePokemon(originalName: string, { newName, sequenceFibonnaci }: RenamePokemonDTO) {
    const response = await http.put(
      `/pokemon/rename/${originalName}`,
      {
        newName,
        sequenceFibonnaci,
      },
      undefined,
    );
    return response.data as RenamePokemonResponseInterface;
  },

  async releasePokemon(name: string) {
    const response = await http.delete(`/pokemon/release/${name}`, undefined);
    return response.data as ReleasePokemonResponseInterface;
  },
};

export const MyPokemonRepository = {
  fetch,
  action,
};
