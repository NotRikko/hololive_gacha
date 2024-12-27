import Style from './AllPulls.module.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function AllPulls ({pulls, handleClick}) {
    return (
        <div id={Style.all_pulls}>
            {pulls.map((pull, index) => {
                const gridRow = index < 5 ? 2 : 3; 
                const containerClassName = (
                    pull.rarity === 'Legendary' ? Style.legendary :
                    pull.rarity === 'Epic' ? Style.epic :
                    Style.common
                );
                return (
                    <div key={index} className={`${Style.pull_container} ${containerClassName}`} style={{ gridRow }}>
                        <img src={pull.image} />
                    </div>
                );
            })}
            <button onClick={handleClick}>
                <ArrowForwardIcon style={{ color: 'white', fontSize: '3.4rem' }} />
            </button>
        </div>
    )
}

export default AllPulls