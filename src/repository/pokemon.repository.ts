import { PokemonDetailInterface } from '@/interfaces/pokemon-detail.interface';
import { PokemonSpeciesInterface } from '@/interfaces/pokemon-species.interface';
import { PokemonInterface } from '@/interfaces/pokemon.interface';
import { BASE_POKEMON_URL } from '@/utils/constant';
import axios from '@/utils/http';

interface GetPokemonParams {
  url: string;
  limit: number;
  offset: number;
}

interface GetDetailPokemonWithSpeciesParams {
  name: string;
  url?: string;
}

const http = axios(BASE_POKEMON_URL);

const fetch = {
  async getPokemon({ url, limit, offset }: GetPokemonParams) {
    let fullUrl = `${url}?limit=${limit}&offset=${offset}`;
    // const result = (await http.fetcher(fullUrl)) as PokemonInterface;
    const response = await http.get(fullUrl);
    const data = response.data as PokemonInterface;

    const temp = [];
    for (const item of data.results) {
      const pokemon = await this.getDetailPokemon(item.name);
      item.detail = pokemon;
      temp.push(item);
    }

    return {
      results: temp,
      count: data.count,
      next: data.next,
    };
  },
  async getDetailPokemon(name: string) {
    let uri = `/pokemon/${name}`;

    const response = await http.get(uri);
    const data = response.data as PokemonDetailInterface;
    return data;
  },

  async getDetailPokemonWithSpecies({ name, url }: GetDetailPokemonWithSpeciesParams) {
    let uri = `${url}/${name}`;

    const response = await http.get(uri);
    const data = response.data as PokemonDetailInterface;
    const species = await this.getSpeciesPokemon(name);

    data.species = species;

    return data;
  },

  async getSpeciesPokemon(name: string) {
    let uri = `/pokemon-species/${name}`;
    const response = await http.get(uri);
    const data = response.data as PokemonSpeciesInterface;
    return data;
  },
};
const action = {};

export const PokemonRepository = {
  fetch,
  action,
};
