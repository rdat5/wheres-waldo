function ScoreListItem( {position, name, score, date} ) {
    return (
        <tr>
            <th>{position}</th>
            <td>{name}</td>
            <td>{score.toFixed(2)} seconds(s)</td>
            <td>{date.toLocaleString()}</td>
        </tr>
    );
}

export default ScoreListItem;