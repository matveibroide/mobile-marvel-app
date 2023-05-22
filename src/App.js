
import './App.scss';
import MainCharactersTab from './components/moviesMainTab/moviesMainTab';
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <Header/>
      <MainCharactersTab/>
    </div>
  );
}

export default App;
