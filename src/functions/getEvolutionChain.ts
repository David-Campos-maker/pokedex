import api from "../services/api"

/**
 * @description Function responsible for returning the evolutionary chain of a pokemon
 * 
 * @param {Any} url Link that redirects to a JSON within the api that contains the pokemon species information
**/

export default function getEvolutionChain(url: any): Array<string> {
    const evoChain: Array<string> = [];

    api.get(url).then((response) => {
        api.get(response.data.evolution_chain.url).then((res) => {
            let evoData = res.data.chain;

            do {
                const numberOfEvolutions = evoData['evolves_to'].length;

                evoChain.push(evoData.species.name[0].toUpperCase() + evoData.species.name.substring(1));

                if(numberOfEvolutions > 1) {
                    for(let i = 1; i < numberOfEvolutions; i++) {
                        evoChain.push( evoData.evolves_to[i].species.name[0].toUpperCase() + evoData.evolves_to[i].species.name.substring(1))
                    }
                }

                evoData = evoData['evolves_to'][0];
            } while(!!evoData && Object.prototype.hasOwnProperty.call(evoData, 'evolves_to'));
        });
    });
    return evoChain;
}