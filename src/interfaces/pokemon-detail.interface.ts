import { PokemonSpeciesInterface } from './pokemon-species.interface';

export interface PokemonDetailInterface {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Common[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species?: PokemonSpeciesInterface;
  sprites: Sprites;
  cries: Cries;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
}

interface Common {
  name: string;
  url: string;
}

interface Ability {
  is_hidden: boolean;
  slot: number;
  ability: Common;
}

interface Cries {
  latest: string;
  legacy: string;
}

interface GameIndex {
  game_index: number;
  version: Common;
}

interface HeldItem {
  item: Common;
  version_details: VersionDetail[];
}

interface VersionDetail {
  rarity: number;
  version: Common;
}

interface Move {
  move: Common;
  version_group_details: VersionGroupDetail[];
}

interface VersionGroupDetail {
  level_learned_at: number;
  version_group: Common;
  move_learn_method: Common;
}

interface PastType {
  generation: Common;
  types: Type[];
}

interface Type {
  slot: number;
  type: Common;
}

interface GenerationV {
  'black-white': Sprites;
}

interface GenerationIv {
  'diamond-pearl': Sprites;
  'heartgold-soulsilver': Sprites;
  platinum: Sprites;
}

interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': { [key: string]: Home };
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
  showdown: Sprites;
}

interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

interface GenerationI {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

interface RedBlue {
  back_default: string;
  back_gray: string;
  front_default: string;
  front_gray: string;
}

interface GenerationIi {
  crystal: Crystal;
  gold: Crystal;
  silver: Crystal;
}

interface Crystal {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

interface GenerationIii {
  emerald: OfficialArtwork;
  'firered-leafgreen': Crystal;
  'ruby-sapphire': Crystal;
}

interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

interface GenerationVii {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': Home;
}

interface DreamWorld {
  front_default: string;
  front_female: null;
}

interface GenerationViii {
  icons: DreamWorld;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: Common;
}
