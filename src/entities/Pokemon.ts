import IPokemonSprites from "../Interfaces/IPokemonSprites";
import IAbility from "../Interfaces/IAbility";
import IPokemonType from "../Interfaces/IPokemonType";
import IPokemonStats from "../Interfaces/IPokemonStats";

export default class Pokemon {
    abilities: Array<IAbility>;
    evolutionChain: Array<string>;
    height: number;
    id: string;
    moves: Array<string>;
    name: string;
    pokemonStats: Array<IPokemonStats>;
    pokemonTypes: Array<IPokemonType>;
    sprites: IPokemonSprites;
    weight: number;

    constructor(abilities: Array<IAbility> , evolutionChain: Array<string> , height: number ,
        id: string , name: string , pokemonStats: Array<IPokemonStats> , 
        pokemonTypes: Array<IPokemonType> , moves: Array<string> , sprites: IPokemonSprites , weight: number) {
            this.abilities = abilities;
            this.evolutionChain = evolutionChain;
            this.height = height / 10;
            this.id = ("000" + id).slice(-3);
            this.moves = moves;
            this.name = name.replace(/-/g , " ");
            this.pokemonStats = pokemonStats;
            this.pokemonTypes = pokemonTypes;
            this.sprites = sprites;
            this.weight = weight / 10;
    }
}