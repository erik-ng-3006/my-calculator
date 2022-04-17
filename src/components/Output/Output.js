import React from 'react';
import classes from './Output.module.css';
import { useSelector } from 'react-redux';
const Output = () => {
	const inputValue = useSelector((state) => state.expression.inputValue);
	const overallValue = useSelector((state) => state.expression.overallValue);
	return (
		<div className={classes.output}>
			<div className={classes['prev-operand']}>{overallValue}</div>
			<div className={classes.operand} id='display'>
				{inputValue || '0'}
			</div>
		</div>
	);
};

export default Output;
