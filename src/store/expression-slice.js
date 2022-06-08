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
				(state.inputValue === '' && action.payload === '/')
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
			// Check if there is already decimal
			if (state.inputValue.includes('.')) return;
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
			let newArr;
			if (state.overallValue.includes('=')) {
				// remove the calculated part
				newArr = state.overallValue.split(/([-,+,*,/,=])/);
				const i = newArr.lastIndexOf('=');
				newArr = newArr.slice(i + 1);
			} else {
				newArr = state.overallValue.split(/([-,+,*,/])/);
			}
			console.log(newArr);
			const firstEmptyStrIndex = newArr.indexOf('');
			const lastEmptyStrIndex = newArr.lastIndexOf('');
			//check if there is negative sign in expression
			if (
				lastEmptyStrIndex !== -1 &&
				newArr[lastEmptyStrIndex + 1] === '-' &&
				regex.test(newArr[lastEmptyStrIndex + 2])
			) {
				newArr.splice(
					lastEmptyStrIndex,
					3,
					`-${newArr[lastEmptyStrIndex + 2]}`
				);
			} // remove useless operands keep the last one
			else if (
				firstEmptyStrIndex === lastEmptyStrIndex &&
				firstEmptyStrIndex !== -1
			) {
				console.log('if');
				newArr.splice(firstEmptyStrIndex - 1, 2);
			} else {
				console.log('else');
				newArr.splice(firstEmptyStrIndex - 1, lastEmptyStrIndex);
			}
			while (newArr.length > 1) {
				// calculate all multiply and divide first
				for (let i = 1; i < newArr.length; i += 2) {
					if (newArr[i] === '*') {
						newArr.splice(
							i - 1,
							3,
							parseFloat(newArr[i - 1]) *
								parseFloat(newArr[i + 1])
						);
					}
					if (newArr[i] === '/') {
						newArr.splice(
							i - 1,
							3,
							parseFloat(newArr[i - 1]) /
								parseFloat(newArr[i + 1])
						);
					}
				}
				// calculate plus and minus
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
