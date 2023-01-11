import IPokemonSprites from "./IPokemonSprites";
import IAbility from "./IAbility";
import IPokemonType from "./IPokemonType";
import IPokemonStats from "./IPokemonStats";

export default interface IPokemon {
    id: string;
    name: string;
    height: number;
    weight: number;
    sprites: IPokemonSprites;
    abilities: Array<IAbility>;
    pokemonTypes: Array<IPokemonType>;
    pokemonStats: Array<IPokemonStats>
}