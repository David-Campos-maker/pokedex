import type IPokemonAbility from "@/Interfaces/IAbility";

/** 
 * @description Function that returns an array of abilities that a pokemon can have
 * 
 * @param {Array} abilities Array that contains objects that have the properties of the abilities that the pokemon can have
 * 
 * @returns {Array} List of abilities
**/

export default function getPokemonAbilities(abilities: Array<any>): Array<IPokemonAbility> {
    const list: Array<IPokemonAbility> = [];
    let index: any;

    for(index in abilities) {
        const ability: IPokemonAbility = {
            ability: abilities[index].ability.name.replace(/-/g , " "),
            is_hidden: abilities[index].is_hidden
        };
        list.push(ability);
    }

    return list;
}