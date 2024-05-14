import Style from './Pull.module.css'
import AssassinIcon from '../assets/assassin_icon.png'
import { useState, useEffect } from 'react'

function Pull ({currentPull, handleClick}) {
    const [pullKey, setPullKey] = useState(0);
    useEffect(() => {
        setPullKey(prevKey => prevKey + 1);
    }, [handleClick]);
    
    const containerClassName = (
        currentPull.rarity === 'Legendary' ? Style.legendary :
        currentPull.rarity === 'Epic' ? Style.epic :
        Style.common
    );
    return(
        <div key={pullKey} id={Style.main} onClick={handleClick}>
            <div id={Style.img_container} className={containerClassName}>
                <img src={currentPull.img} />
                <div id={Style.pull_info}>
                    <img src={AssassinIcon}/>
                    <div id={Style.pull_description}>
                        <p>{currentPull.name}</p>
                        {currentPull.rarity === 'Legendary' ? 
                        <div>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                        </div>
                        :
                        <div>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                            <img src='https://www.freepnglogos.com/uploads/star-png/gold-star-transparent-png-clip-art-17.png'/>
                        </div>
                        }
                    </div>
                    </div>
            </div>
        </div>
    )
}

export default Pull