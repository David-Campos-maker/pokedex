import type IPokemonStats from "../Interfaces/IPokemonStats";

export default function getPokemonStats(stats: Array<any>): Array<IPokemonStats> {
    let index: any;
    const resulst: Array<IPokemonStats> = [];

    for(index in stats) {
        const stat: IPokemonStats = {
            stat: stats[index].stat.name.replace(/-/g , " ").toUpperCase(),
            baseStat: stats[index].base_stat
        } 
        resulst.push(stat);
    }

    return resulst;
}