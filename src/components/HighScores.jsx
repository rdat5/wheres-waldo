import ScoreListItem from "./ScoreListItem";

function HighScores( { isActive, setIsActive, scores, userScoreId } ) {
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
                                <th>Submitted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scores.map((item, index) => <ScoreListItem key={item.id} scoreId={item.id} position={index + 1} name={item.scoreName} score={item.scoreTime} date={item.scoreDate} userScoreId={userScoreId}/>)}
                        </tbody>
                    </table>
                </div>
            </section>
            </div>
        </div>
    );
}

export default HighScores