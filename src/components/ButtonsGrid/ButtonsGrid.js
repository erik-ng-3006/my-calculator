import React from 'react';
import classes from './ButtonsGrid.module.css';
import Button from '../ui/Button';
import { useDispatch } from 'react-redux';
import { expressionActions } from '../../store/expression-slice';

const ButtonsGrid = () => {
	const dispatch = useDispatch();
	const addNumber = (num) => {
		dispatch(expressionActions.inputNumber(num));
	};

	return (
		<div className={classes['buttons-grid']}>
			<Button
				className={classes['span-two']}
				id='clear'
				label='AC'
				onClick={() => {
					dispatch(expressionActions.clearAll());
				}}
			/>
			<Button
				label='DEL'
				onClick={() => {
					dispatch(expressionActions.clearOne());
				}}
			/>
			<Button
				id='divide'
				label='/'
				onClick={() => {
					dispatch(expressionActions.inputOperation('/'));
				}}
			/>
			<Button
				id='one'
				label='1'
				onClick={() => {
					addNumber('1');
				}}
			/>
			<Button
				id='two'
				label='2'
				onClick={() => {
					addNumber('2');
				}}
			/>
			<Button
				id='three'
				label='3'
				onClick={() => {
					addNumber('3');
				}}
			/>
			<Button
				id='multiply'
				label='*'
				onClick={() => {
					dispatch(expressionActions.inputOperation('*'));
				}}
			/>
			<Button
				id='four'
				label='4'
				onClick={() => {
					addNumber('4');
				}}
			/>
			<Button
				id='five'
				label='5'
				onClick={() => {
					addNumber('5');
				}}
			/>
			<Button
				id='six'
				label='6'
				onClick={() => {
					addNumber('6');
				}}
			/>
			<Button
				id='add'
				label='+'
				onClick={() => {
					dispatch(expressionActions.inputOperation('+'));
				}}
			/>
			<Button
				id='seven'
				label='7'
				onClick={() => {
					addNumber('7');
				}}
			/>
			<Button
				id='eight'
				label='8'
				onClick={() => {
					addNumber('8');
				}}
			/>
			<Button
				id='nine'
				label='9'
				onClick={() => {
					addNumber('9');
				}}
			/>
			<Button
				id='subtract'
				label='-'
				onClick={() => {
					dispatch(expressionActions.inputOperation('-'));
				}}
			/>
			<Button
				id='decimal'
				label='.'
				onClick={() => {
					dispatch(expressionActions.inputDecimal());
				}}
			/>
			<Button
				id='zero'
				label='0'
				onClick={() => {
					addNumber('0');
				}}
			/>
			<Button
				id='equals'
				className={classes['span-two']}
				label='='
				onClick={() => {
					dispatch(expressionActions.calculate());
				}}
			/>
		</div>
	);
};

export default ButtonsGrid;
