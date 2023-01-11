import type IPokemonSprites from "@/Interfaces/IPokemonSprites";

/**
 * 
 * @param {Any} sprites Object that has all variations of pokemon sprites
 * @returns IPokemonSprites 
 */

export default function getPokemonSprites(sprites: any): IPokemonSprites {
    const result: IPokemonSprites = {
        default: sprites.front_default ,
        shiny: sprites.front_shiny
    };

    return result;
}