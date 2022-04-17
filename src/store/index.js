import { configureStore } from '@reduxjs/toolkit';
import expressionReducer from './expression-slice';
export const store = configureStore({
	reducer: { expression: expressionReducer },
});
