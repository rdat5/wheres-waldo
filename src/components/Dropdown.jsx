function Dropdown( { charData, isActive, setIsActive } ) {
    const dropdownStyle = {
        position: 'absolute',
        top: '200px',
        left: '620px'
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