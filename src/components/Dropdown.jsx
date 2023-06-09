function Dropdown( { charData, isActive, setIsActive, clickLoc } ) {
    const dropdownStyle = {
        position: 'absolute',
        left: `${clickLoc.x}px`,
        top: `${clickLoc.y}px`
    }

    return (
        <div className={`dropdown ${isActive ? 'is-active' : ''}`} style={dropdownStyle}>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    {
                        charData.map((char) =>
                            <div className="dropdown-item level is-clickable" key={char.id}>
                                <img src={char.img} alt="" className="image is-64x64" />
                                <p>{char.name}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Dropdown;