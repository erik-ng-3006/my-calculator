import React from 'react';
import classes from './Button.module.css';
const Button = (props) => {
	const styles = `${props.className} ${classes.btn}`;

	return (
		<div className={styles} onClick={props.onClick} id={props.id}>
			{props.label}
		</div>
	);
};

export default Button;
