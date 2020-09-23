import React from 'react';

export const TaskBanner = (props) => {
	const { username, taskItems } = props;
	return (
		<h4 className='bg-primary text-white text-center p-4'>
			Hi {username} here you can meet the{' '}
      {taskItems.filter((item) => item.done === false).length}{' '}
      tasks to do!!
		</h4>
	);
};
