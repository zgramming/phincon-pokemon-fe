import { PokemonDetailInterface } from "./pokemon-detail.interface";

export interface PokemonInterface {
  count: number;
  next: string;
  previous: null;
  results: PokemonResult[];
}

export interface PokemonResult {
  name: string;
  url: string;
  detail?: PokemonDetailInterface;
}
