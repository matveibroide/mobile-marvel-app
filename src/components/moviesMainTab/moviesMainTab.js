import React, { useState, useEffect } from 'react';
import getCharacters from '../../services/services';
import './moviesMainTab.scss'
import { getCharacter } from '../../services/services';
import { apiKey } from '../../services/services';



function MainCharactersTab() {
const [characters, setCharacters] = useState([]);
const [charId,setRecordedId] = useState("1017100");
const [charInfo, setCharInfo] = useState(null);
const [visible,setVisible] = useState(true);
const [offset,setOffset] = useState(6);





useEffect(() => {
async function fetchCharacters() {
    try {
    const charactersData = await getCharacters(apiKey,offset);
    setCharacters(charactersData);
    console.log('fetchAllChars')
    } catch (error) {
    console.error(error);
    }
}

fetchCharacters();
},[offset]);

useEffect(() => {
    async function fetchCharacter() {
        try {
        const characterInfo = await getCharacter(charId);
        setCharInfo(characterInfo)
        console.log('fetchChar')
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
    // state offset 5
    //click => loadMoreChars(offset + 5)
    //update state setChars(data)

    const target = e.target

    if (target) {
        const newOffset = offset + 6
        setOffset(newOffset)
    }
}
    
    const description = charInfo && charInfo[0].description ?  charInfo[0].description : 'No info about this character'
    const name = charInfo ? charInfo[0].name : null
    const thumbnail = charInfo ? charInfo[0].thumbnail.path : ''

    // info = info about character active:false
    //character tab active:true

    const content = visible ? (
        <div className="chars-column-wrapper">
            <div className="character-column">
            {characters.map((character, i) => (
                    <div key={i}
                        className="character-wrapper"
                        >
                        <div
                        onClick={setCharacterID}
                        className='character'
                        id = {character.id}
                        style=
                            {{backgroundImage: `url(${character.thumbnail.path}.jpg)`,
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
        <div className="char-info">
        <div className='char-name'>{name}</div> 
        {<div className='char-image' 
        style={{backgroundImage:`url(${thumbnail}.jpg)`}}> 
        </div> }
        <div className='char-description'>{description}</div>
        <div className='close-window' onClick={changeVisibility}> Go back</div>
        </div>
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
