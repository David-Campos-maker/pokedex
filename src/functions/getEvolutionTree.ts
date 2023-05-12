import type IEvolution from "@/Interfaces/IEvolution";
import api from "@/services/api";
import getPokemonTypes from "./getPokemonTypes";

export default async function getEvolutionTree(evoData: any): Promise<IEvolution> {
  const evolutionTree: Array<IEvolution> = [];
  const nextStep = {} as IEvolution;

  if (evoData.evolves_to && evoData.evolves_to.length > 0) {
    for (const evolution of evoData.evolves_to) {
      evolutionTree.push(await getEvolutionTree(evolution));
    }
  }

  try {
    const speciesResponse = await api.get(`pokemon-species/${evoData.species.name}`);
    const varieties = speciesResponse.data.varieties;

    const baseForm = varieties.find((variety: { is_default: boolean; }) => variety.is_default);

    const res = await api.get(`pokemon/${baseForm.pokemon.name}`);
    nextStep.id = ("000" + res.data.id).slice(-3);
    nextStep.name = res.data.name.replace('-', ' ');
    nextStep.sprite = res.data.sprites.front_default;
    nextStep.types = getPokemonTypes(res.data.types);
    nextStep.next_step = evolutionTree;
  } 
  
  catch {
    console.log("Failed to fetch data for evolution tree");
  }

  return nextStep;
}