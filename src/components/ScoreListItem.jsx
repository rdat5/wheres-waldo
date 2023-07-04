function ScoreListItem( {scoreId, position, name, score, date, userScoreId} ) {
    return (
        <tr className={scoreId === userScoreId ? "is-selected" : ''}>
            <th>{position}</th>
            <td>{name}</td>
            <td>{score.toFixed(2)} seconds(s)</td>
            <td>{date.toLocaleString()}</td>
        </tr>
    );
}

export default ScoreListItem;