import type IPokemonType from "@/Interfaces/IPokemonType";

/**
 * 
 * @param types Array that contains the types of a pokemon
 * @returns IPokemonTypes
 */

export default function getPokemonTypes(types: Array<any>): Array<IPokemonType> {
    const results: Array<IPokemonType> = [];
    let index: any;

    for(index in types) {
        const type: IPokemonType = {
            pokemonType: types[index].type.name.toUpperCase() 
        } 
        results.push(type);
    }

    return results;
}