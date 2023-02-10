import axios from "axios";

export default async function getEvolutionChainUrl(speciesUrl: string): Promise<string> {

    const response = await axios.get(speciesUrl);

    const evolutionUrl: string = response.data.evolution_chain.url

    return evolutionUrl;
}