function PlayerCard () {
    const playerCard = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '70%',
        padding: '1%',
        paddingTop: '2%',
        paddingBottom: '2%',
        marginTop: '2%',
        marginLeft: '2%',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '1.3rem',
        border: '3px solid white',
    }
    
    return (
        <div style={playerCard}>
            <img 
            src='https://img.itch.zone/aW1nLzE1MDI4NjUzLnBuZw==/original/zSPnHi.png'
            style={{ width:'25%', border: '2px solid white', borderRadius: '15px'}}
            />
            <div>
                <p>LVL</p>
                <p>9</p>
            </div>
            <p>Rikko</p>
        </div>
    )
}

export default PlayerCard