import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase";
import ScoreListItem from "./ScoreListItem";

function HighScores( { isActive, setIsActive } ) {
    const [highScoreList, setHighScoreList] = useState([]);

    useEffect(() => {
        // Retrieve high scores
        fetchHighScores();
    }, []);

    async function fetchHighScores() {
        const querySnapshot = await getDocs(collection(db, "high_scores"));
        const fetchedScores = [];
        querySnapshot.forEach((doc) => {
            const scoreItem = {
                id: doc.id,
                scoreName: doc.data().name,
                scoreTime: doc.data().score,
                scoreDate: new Date(doc.data().submissionDate.seconds * 1000 + doc.data().submissionDate.nanoseconds/1000000)
            }
            fetchedScores.push(scoreItem);
        });
        // Sort high score list
        fetchedScores.sort((a, b) => (a.scoreTime > b.scoreTime) ? 1 : -1);
        setHighScoreList(fetchedScores);
    }

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
                            {highScoreList.map((item, index) => <ScoreListItem key={item.id} position={index + 1} name={item.scoreName} score={item.scoreTime}/>)}
                        </tbody>
                    </table>
                </div>
            </section>
            </div>
        </div>
    );
}

export default HighScores