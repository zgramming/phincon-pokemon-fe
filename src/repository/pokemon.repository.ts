import { PokemonDetailInterface } from '@/interfaces/pokemon-detail.interface';
import { PokemonSpeciesInterface } from '@/interfaces/pokemon-species.interface';
import { PokemonInterface } from '@/interfaces/pokemon.interface';
import { http } from '@/utils/http';

interface GetPokemonParams {
  url: string;
  limit: number;
  offset: number;
}

interface GetDetailPokemonWithSpeciesParams {
  name: string;
  url?: string;
}

const actions = {
  async getPokemon({ url, limit, offset }: GetPokemonParams) {
    let fullUrl = `${url}?limit=${limit}&offset=${offset}`;
    const result = (await http.fetcher(fullUrl)) as PokemonInterface;

    const temp = [];
    for (const item of result.results) {
      const pokemon = await this.getDetailPokemon(item.name);
      item.detail = pokemon;
      temp.push(item);
    }

    return {
      results: temp,
      count: result.count,
      next: result.next,
    };
  },
  async getDetailPokemon(name: string) {
    let uri = `/pokemon/${name}`;
    const result = (await http.fetcher(uri)) as PokemonDetailInterface;

    return result;
  },

  async getDetailPokemonWithSpecies({ name, url }: GetDetailPokemonWithSpeciesParams) {
    let uri = `${url}/${name}`;
    const result = (await http.fetcher(uri)) as PokemonDetailInterface;

    const species = await this.getSpeciesPokemon(name);

    result.species = species;

    return result;
  },

  async getSpeciesPokemon(name: string) {
    let uri = `/pokemon-species/${name}`;
    const result = (await http.fetcher(uri)) as PokemonSpeciesInterface;
    return result;
  },
};
const api = {};

export const PokemonRepository = {
  actions,
  api,
};
