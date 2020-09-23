import React, { useState, useEffect } from 'react';
import { TaskRows } from './components/TaskRow';
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';

function App() {
	const [username, setUsername] = useState('Hugo');
	const [taskItems, setTaskItems] = useState([
		{
			id: 1,
			name: 'Task One',
			done: false,
		},
		{
			id: 2,
			name: 'Task Two',
			done: true,
		},
		{
			id: 3,
			name: 'Task Three',
			done: false,
		},
		{
			id: 4,
			name: 'Task Four',
			done: false,
		},
	]);

	const [showCompleted, setShowCompleted] = useState(true);

	useEffect(() => {
    let data = localStorage.getItem("tasks");
		if (data != null) {
			setTaskItems(JSON.parse(data));
		} else {
      setUsername('Hugo Example');
			setTaskItems([
				{
					id: 1,
					name: 'Task Storage One',
					done: false,
				},
				{
					id: 2,
					name: 'Task Storage Two',
					done: true,
				},
				{
					id: 3,
					name: 'Task Storage Three',
					done: false,
				},
				{
					id: 4,
					name: 'Task Storage Four',
					done: false,
				},
			]);
			setShowCompleted(true);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(taskItems));
	}, [taskItems]);

	const createNewTask = (taskName) => {
		if (
			!taskItems.find((t) => t.name === taskName) &&
			taskName !== ''
		) {
			setTaskItems([
				...taskItems,
				{
					id: taskItems.length + 1,
					name: taskName,
					done: false,
				},
			]);
		}
	};

	const toggleTask = (task) => {
		setTaskItems(
			taskItems.map((t) =>
				t.id === task.id ? { ...t, done: !t.done } : t
			)
		);
	};

	const taskTableRows = (doneTask) => {
		return taskItems
			.filter((task) => task.done === doneTask)
			.map((task) => (
				<TaskRows
					key={task.id}
					task={task}
					toggleTask={toggleTask}
				/>
			));
	};
	// console.log(taskItems);

	return (
		<div className='App'>
			<TaskBanner username={username} taskItems={taskItems} />
			<TaskCreator callback={createNewTask} />
			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th>Description</th>
						<th>Done</th>
					</tr>
				</thead>
				<tbody>{taskTableRows(false)}</tbody>
			</table>
			<div className='bg-secondary text-white text-center p-2'>
				<VisibilityControl
					description='Completed Tasks'
					isChecked={showCompleted}
					callback={(checked) => setShowCompleted(checked)}
				/>
			</div>
			{showCompleted && (
				<table className='table table-striped table-bordered'>
					<thead>
						<tr>
							<th>Description</th>
							<th>Done</th>
						</tr>
					</thead>
					<tbody>{taskTableRows(true)}</tbody>
				</table>
			)}
		</div>
	);
}

export default App;
