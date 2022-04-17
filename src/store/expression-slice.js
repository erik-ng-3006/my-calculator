import { createSlice } from '@reduxjs/toolkit';
const regex = /\d/g;
let isCalculated = false;

const expressionSlice = createSlice({
	name: 'expression',
	initialState: { inputValue: '', overallValue: '' },
	reducers: {
		inputOperation(state, action) {
			if (
				(state.inputValue === '' && action.payload === '*') ||
				(state.inputValue === '' && action.payload === '÷')
			) {
				return;
			}

			isCalculated = false;
			state.inputValue = action.payload;
			state.overallValue += action.payload;
		},
		inputNumber(state, action) {
			if (isCalculated) {
				return;
			}
			if (state.inputValue === '0' && action.payload === '0') {
				return;
			}
			if (!regex.test(state.inputValue)) {
				state.inputValue = action.payload;
				state.overallValue += action.payload;
			} else {
				state.inputValue += action.payload;
				state.overallValue += action.payload;
			}
		},
		inputDecimal(state) {
			// Check if the last char is decimal
			if (state.inputValue[state.inputValue.length - 1] === '.') {
				return;
			}
			state.inputValue += '.';
			state.overallValue += '.';
		},
		clearAll(state) {
			isCalculated = false;
			state.inputValue = '';
			state.overallValue = '';
		},
		clearOne(state) {
			state.inputValue = state.inputValue
				.toString()
				.split('')
				.slice(0, state.inputValue.length - 1)
				.join('');
			state.overallValue = state.overallValue
				.toString()
				.split('')
				.slice(0, state.overallValue.length - 1)
				.join('');
		},
		calculate(state) {
			if (isCalculated) {
				return;
			}
			const newArr = state.overallValue.split(/([-,+,*,÷])/);
			while (newArr.length > 1) {
				for (let k = 0; k < newArr.length; k++) {
					//add the element together if there are two consecutive operands
					if (newArr[k] === '') {
						newArr.splice(k, 3, newArr[k + 1] + newArr[k + 2]);
					}
				}
				for (let i = 1; i < newArr.length; i += 2) {
					if (newArr[i] === '*') {
						newArr.splice(
							i - 1,
							3,
							parseFloat(newArr[i - 1]) *
								parseFloat(newArr[i + 1])
						);
					}
					if (newArr[i] === '÷') {
						newArr.splice(
							i - 1,
							3,
							parseFloat(newArr[i - 1]) /
								parseFloat(newArr[i + 1])
						);
					}
				}
				for (let j = 1; j < newArr.length; j += 2) {
					if (newArr[j] === '+') {
						newArr.splice(
							j - 1,
							3,
							parseFloat(newArr[j - 1]) +
								parseFloat(newArr[j + 1])
						);
					}
					if (newArr[j] === '-') {
						const value =
							parseFloat(newArr[j - 1]) -
							parseFloat(newArr[j + 1]);
						newArr.splice(j - 1, 3, value);
					}
				}
			}
			state.inputValue = newArr[0];
			state.overallValue += ` = ${newArr[0]}`;
			isCalculated = true;
		},
	},
});

export const expressionActions = expressionSlice.actions;

export default expressionSlice.reducer;
