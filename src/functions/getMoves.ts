import api from '@/services/api';
import type IMoves from '../Interfaces/IMoves';

/**
 * @description Function responsible for returning the moves learned by a pokemon
 * 
 * @param {Any} moves List of moves a pokemon can learn
**/

export default function getPokemonMoves(moves: Array<any>): Array<IMoves> {
    const result: Array<IMoves> = [];

    moves.forEach(element => {
        api.get(element.move.url).then(res => {
            const object: IMoves = {
                name: res.data.name ,
                accuracy: res.data.accuracy ,
                damage_class: res.data.damage_class.name ,
                power: res.data.power ,
                pp: res.data.pp ,
                priority: res.data.priority ,
                type: res.data.type.name
            }
            
            result.push(object);
        });
    });
    
    return result;
}