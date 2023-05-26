import React, { useState, useEffect } from 'react';
import getCharacters from '../../services/services';
import './charsMainTab.scss'
import { getCharacter } from '../../services/services';
import { apiKey } from '../../services/services';
import spinnerPath from '../../assets/spinner.gif';



function MainCharactersTab() {
const [characters, setCharacters] = useState([]);
const [charId,setRecordedId] = useState(null);
const [charInfo, setCharInfo] = useState(null);
const [visible,setVisible] = useState(true);
const [offset,setOffset] = useState(6);
const [loadingChars,setLoadingChars] = useState(true);
const [loadingChar,setLoadingChar] = useState(true);




useEffect(() => {
async function fetchCharacters() {

    setLoadingChars(true)
    try {
    
    const charactersData = await getCharacters(apiKey,offset);
        if(charactersData) {
            setLoadingChars(false)
        }
    setCharacters(charactersData);

    
    
    } catch (error) {
    console.error(error);
    }
}
fetchCharacters();
},[]);



useEffect(() => {
    async function fetchCharacters() {
        setLoadingChars(true)
        try {

        const charactersData = await getCharacters(apiKey,offset);

            if(charactersData) {
                setLoadingChars(false)
            }

        setCharacters(charactersData);

        } catch (error) {
        console.error(error);
        }
    }
    fetchCharacters();
},[offset]);



useEffect(() => {
    async function fetchCharacter() {

        setLoadingChar(true)

        try {
        const characterInfo = await getCharacter(charId);

        if (characterInfo) 
        {setLoadingChar(false)}

        setCharInfo(characterInfo)
        } catch (error) {
        console.error(error);
        }
    }
    
    fetchCharacter();
}, [charId]);
    


const setCharacterID = (e) => {
    const target = e.target
    if (target) {
    const key = target.getAttribute('id');
    setRecordedId(key);
    const visibility = visible ? false : true;
    setVisible(visibility)
    }

};

const changeVisibility = (e) => {
    const target = e.target
    if (target) {
    const visibility = visible ? false : true;
    setVisible(visibility)
    }
}



const loadMoreChars = (e) => {
    

    const target = e.target

    if (target) {
        const newOffset = offset + 6
        setOffset(newOffset)
    }
}
    
    const description = charInfo && charInfo[0].description ?  charInfo[0].description : 'No info about this character'
    const name = charInfo ? charInfo[0].name : null
    const thumbnail = charInfo ? charInfo[0].thumbnail.path : ''




const content = visible ? (
<div className="chars-column-wrapper">
    
    <div className="character-column">
    {
    
    loadingChars ? [...Array(offset)].map((item,key)=>
    
    (

        <img className='spinner' key = {key} style={{height:'300px',width:'200px'}} src={spinnerPath} alt='spinner'></img>

    )
        
    ) :
    characters.map((character, i) => (
            <div key={i}
                className="character-wrapper"
                > 
                <div
                    onClick={setCharacterID}
                    className='character'
                    id = {character.id}
                    style=
                        {{backgroundImage:`url(${character.thumbnail.path}.jpg)`,
                        backgroundSize:'cover',
                        height:'200px',
                        margin:'0'}}>
                </div>
                <div className='chars-name'>{character.name}</div>
            </div>
        
        ))}
        </div>
        <button onClick={loadMoreChars} className='button-main'>load more</button>
</div>

) :

(
<div className="char-info-wrapper">
    {loadingChar ? 
    (

    <img className='spinner' style={{height:'300px',width:'200px'}} src={spinnerPath} alt='spinner'></img>

    ) : 
    
    (<div className="char-info">
        <div className='char-name'>{name}</div> 
        {<div className='char-image' 
        style={{backgroundImage:`url(${thumbnail}.jpg)`}}> 
        </div> }
        <div className='char-description'>{description}</div>
        <div className='close-window' onClick={changeVisibility}> Go back</div>
    </div>)
    }
</div>  
);


return (
<div className="content-wrapper">
    {
        content
    }

</div>
);
}

export default MainCharactersTab;
