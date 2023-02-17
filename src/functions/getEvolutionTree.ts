import type IEvolution from "@/Interfaces/IEvolution";
import api from "@/services/api";
import getPokemonTypes from "./getPokemonTypes";

export default async function getEvolutionTree(evoData: any): Promise<IEvolution> {
    const evolutionTree: Array<IEvolution> = [];
    const nextStep = {} as IEvolution;

    if(evoData.evolves_to && evoData.evolves_to.length > 0) {
        for(const evolution of evoData.evolves_to) {
            evolutionTree.push(await getEvolutionTree(evolution));
        }
    }
    
    const res = await api.get('https://pokeapi.co/api/v2/pokemon/' + `${evoData.species.name}`);
    nextStep.id = res.data.id;
    nextStep.name = res.data.name;
    nextStep.sprite = res.data.sprites.front_default;
    nextStep.types = getPokemonTypes(res.data.types);
    nextStep.next_step = evolutionTree;

    return nextStep;
}
