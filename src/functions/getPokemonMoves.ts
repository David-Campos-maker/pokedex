export default function getPokemonMoves(moves: Array<any>): Array<string> {
    const result: Array<string> = [];
    let index: any;

    for(index in moves) {
        result.push(moves[index].move.name);
    }

    return result;
}