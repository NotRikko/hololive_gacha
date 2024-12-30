import Style from './UnitDetail.module.css';

function UnitDetail({ selectedUnit, viewingUnitState, onClose }) {
    if (!viewingUnitState || !selectedUnit) return null;

    return (
        <div id={Style.main}>
            <img src={selectedUnit.image} alt={`${selectedUnit.name} Image`} />
            <div id={Style.unitInfo}>
                <h1>{selectedUnit.name}</h1>
                <h2>{selectedUnit.description}</h2>
                <h2>Level {selectedUnit.level}</h2>
                <button onClick={onClose}>Exit</button>
            </div>
        </div>
    );
}

export default UnitDetail;