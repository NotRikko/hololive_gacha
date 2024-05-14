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
                        <img src='https://img3.gelbooru.com//samples/e3/05/sample_e30567fffb89ba33496c3ff1abdc57f8.jpg'/>
                    </div>
                </div>
                <img src={selectedBanner.img}></img>
        </div>
    )
}

export default Banner