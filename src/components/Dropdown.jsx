function Dropdown() {
    const dropdownStyle = {
        position: 'absolute',
        top: '200px',
        left: '620px'
    }

    return (
        <div className="dropdown is-active" style={dropdownStyle}>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <button className="button is-fullwidth">Finn</button>
                    </div>
                    <div className="dropdown-item">
                        <button className="button is-fullwidth">Rocko</button>
                    </div>
                    <div className="dropdown-item">
                        <button className="button is-fullwidth">Grunkle Stan</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;