import React from 'react';
import classes from './Footer.module.css';
const Footer = () => {
	return (
		<footer className={classes.footer}>
			created by{' '}
			<a
				href='https://github.com/erik-ng-3006'
				target='_blank'
				rel='noreferrer'
			>
				erik-ng
			</a>
		</footer>
	);
};

export default Footer;
