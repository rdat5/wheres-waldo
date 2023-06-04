import ScoreListItem from "./ScoreListItem";

function HighScores( { isActive, setIsActive } ) {
    return (
        <div className={`modal ${isActive ? 'is-active' : ''}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">High Scores</p>
                <button className="delete" aria-label="close" onClick={() => setIsActive(false)}></button>
            </header>
            <section className="modal-card-body">
                <div className="table-container">
                    <table className="table is-striped is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th><abbr title="How long it took to find all hidden characters">Time</abbr></th>
                            </tr>
                        </thead>
                        <tbody>
                            <ScoreListItem position={1} name="Test1" score={10.00}/>
                            <ScoreListItem position={2} name="Test2" score={10.01}/>
                            <ScoreListItem position={3} name="Test3" score={10.02}/>
                            <ScoreListItem position={4} name="Test4" score={10.03}/>
                            <ScoreListItem position={5} name="Test5" score={10.04}/>
                        </tbody>
                    </table>
                </div>
            </section>
            </div>
        </div>
    );
}

export default HighScores