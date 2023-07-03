function ScoreListItem( {position, name, score} ) {
    return (
        <tr>
            <th>{position}</th>
            <td>{name}</td>
            <td>{score.toFixed(2)}s</td>
        </tr>
    );
}

export default ScoreListItem;