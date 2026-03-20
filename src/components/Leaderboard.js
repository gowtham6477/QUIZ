import React from "react";

function Leaderboard({ entries = [] }) {
	return (
		<table style={styles.table}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Score</th>
					<th>Rank</th>
				</tr>
			</thead>
			<tbody>
				{entries.map((entry, index) => (
					<tr key={entry.username || index}>
						<td>{entry.username}</td>
						<td>{entry.score}/{entry.total}</td>
						<td>#{index + 1}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

const styles = {
	table: {
		width: "100%",
		borderCollapse: "collapse"
	}
};

export default Leaderboard;
