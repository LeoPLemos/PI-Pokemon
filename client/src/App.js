import './App.css';
import { Route, Switch } from "react-router-dom";
import Pokemons from './components/Pokemons';
import DetailPokemon from './components/DetailPokemon'
import Create from './components/views/Create';
import FilterType from './components/elements/FilterByType';
import FilterCreate from './components/elements/FilterByCreator';
import LandingPage from './components/views/LandingPage';

// import Detail from './components/views/Detail';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Pokemons} />
        <Route exact path="/pokemon/:id" component={DetailPokemon} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/creator" component={FilterCreate} />
      </Switch>
      
    </div>
  );
}

export default App;
