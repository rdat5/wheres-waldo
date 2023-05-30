function HighScores() {
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">High Scores</p>
                <button className="delete" aria-label="close"></button>
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
                            <tr>
                                <th>1</th>
                                <td>Test</td>
                                <td>20.24s</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>Test2</td>
                                <td>10.54s</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>Test3</td>
                                <td>10.54s</td>
                            </tr>
                            <tr>
                                <th>4</th>
                                <td>Test4</td>
                                <td>10.54s</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            </div>
        </div>
    );
}

export default HighScores