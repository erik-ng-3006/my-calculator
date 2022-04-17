import classes from './App.module.css';
import ButtonsGrid from './components/ButtonsGrid/ButtonsGrid';
import Footer from './components/Footer/Footer';
import Output from './components/Output/Output';

function App() {
	return (
		<>
			<div className={classes['calculator']}>
				<Output />
				<ButtonsGrid />
			</div>
			<Footer />
		</>
	);
}

export default App;
