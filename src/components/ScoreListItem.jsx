function ScoreListItem( {position, name, score} ) {
    return (
        <tr>
            <th>{position}</th>
            <td>{name}</td>
            <td>{score}s</td>
        </tr>
    );
}

export default ScoreListItem;