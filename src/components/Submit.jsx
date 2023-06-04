function Submit( { isActive, setIsActive } ) {
    return (
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Submit High Score</p>
                </header>
                <section className="modal-card-body">
                    <div className="field">
                        <div className="field">
                            <label className="label">Score</label>
                            <div className="control">
                                <p className="is-size-2">{20.12} seconds</p>
                            </div>
                        </div>
                        <label className="label">Name</label>
                        <div className="field">
                            <div className="control">
                                <input type="text" className="input" placeholder="Your Name Here"/>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="card-footer">
                    <button className="button card-footer-item is-success">Submit</button>
                    <button className="button card-footer-item is-danger" onClick={() => setIsActive(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default Submit;