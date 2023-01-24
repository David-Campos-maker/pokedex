/**
 * @description Function responsible for returning the moves learned by a pokemon
 * 
 * @param {Any} moves List of moves a pokemon can learn
**/

export default function getPokemonMoves(moves: Array<any>): Array<string> {
    const result: Array<string> = [];
    let index: any;

    for(index in moves) {
        result.push(moves[index].move.url);
    }

    return result;
}