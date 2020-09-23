import React from 'react';

export const TaskRows = (props) => {
	const { task, toggleTask } = props;
	return (
		<tr key={task.id}>
			<td>{task.name}</td>
			<td>
				<input
					type='checkbox'
					checked={task.done}
					onChange={() => toggleTask(task)}
				/>
			</td>
		</tr>
	);
};
