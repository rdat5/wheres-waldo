import { useRef } from "react";

function Dropdown( { charData, isActive, setIsActive, clickLoc, isShifted, isBottomShift, checkFn } ) {
    const dropDownRef = useRef(null);

    const dropdownStyle = {
        position: 'absolute',
        left: `${clickLoc.x + (isShifted ? (-200) : 10)}px`,
        top: `${clickLoc.y + (isBottomShift ? (-300) : 10)}px`
    }

    return (
        <div ref={dropDownRef} className={`dropdown ${isActive ? 'is-active' : ''}`} style={dropdownStyle}>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    {
                        charData.map((char) =>
                            <div 
                                className={`dropdown-item level ${char.isFound ? 'has-background-success' : 'is-clickable'}`}
                                key={char.id} 
                                onClick={() => {
                                    checkFn(char.id);
                                }}
                            >
                                <img src={char.img} alt="" className="image is-64x64" />
                                <p>{char.name} {char.isFound ? '✔️' : ''}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Dropdown;