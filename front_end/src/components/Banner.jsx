import Nerissa from '../assets/Nerissa_Plush.png';
import Style from './Banner.module.css';

function Banner ({selectedBanner}) {

    return (
        <div id={Style.banner}> 
                <div id={Style.banner_info}>
                    <h1 style={{ fontSize: '3rem'}}>{selectedBanner.title}</h1>
                    <p style={{ fontSize: '2.1rem'}}>6d 23h</p>
                    <p style={{ fontSize: '2.1rem'}}>Every <span style={{color:'orange'}}>10</span> summons guarantees a <span style={{color:'orange'}}>4</span> star or above unit.</p>
                    <div id={Style.featured_units}>
                        <img src={Nerissa}/>
                        <img src='https://media.tenor.com/UdhF0AkQiKgAAAAe/fuwamoco-lets-go.png'/>
                        <img src='https://ih1.redbubble.net/image.5145511702.2080/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'/>
                    </div>
                </div>
                <img src={selectedBanner.image}></img>
        </div>
    )
}

export default Banner