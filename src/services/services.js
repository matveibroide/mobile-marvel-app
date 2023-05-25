import axios from 'axios';

export const apiKey  = 'fda235cc4058b964d6bebb1e88bfdc01';
/* const prevKey = 'c4e1bd0e70081aed2a98de5106235fb5' */

async function getCharacters(apiKey,amount = 4) {
try {
    const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?limit=${amount}&apikey=${apiKey}`);
    
    return response.data.data.results;
} catch (error) {
    console.error(error);
    throw error;
}
}

async function getCharacter(id = "1017100") {
    try {
        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${apiKey}`);
        
        return response.data.data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
    }



    export default getCharacters;
    export {getCharacter};
    