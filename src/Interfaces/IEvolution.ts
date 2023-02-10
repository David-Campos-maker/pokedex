import type IPokemonType from "./IPokemonType";

export default interface IEvolution {
    id: number;
    name: string;
    sprite: string;
    type: Array<IPokemonType>;
    next_step: Array<IEvolution>;
} 