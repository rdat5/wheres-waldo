import { collection, addDoc, Timestamp } from "firebase/firestore";
import db from "../firebase";

function Submit( { isActive, setIsActive, timeScore, userName, userNameFn, scoreSubmittedFn } ) {
    function handleChange(e) {
        userNameFn(e.target.value)
    }

    async function onSubmitClick() {
        await addDoc(collection(db, "high_scores"), {
            name: userName,
            score: timeScore,
            submissionDate: Timestamp.fromDate(new Date())
        });
        scoreSubmittedFn(true);
        setIsActive(false);
    }

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
                                <p className="is-size-2">{timeScore.toFixed(2)} seconds</p>
                            </div>
                        </div>
                        <label className="label">Name</label>
                        <div className="field">
                            <div className="control">
                                <input type="text" className="input" placeholder="Your Name Here" value={userName} onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="card-footer">
                    <button className="button card-footer-item is-success" onClick={onSubmitClick}>Submit</button>
                    <button className="button card-footer-item is-danger" onClick={() => setIsActive(false)}>Cancel</button>
                </footer>
            </div>
        </div>
    );
}

export default Submit;