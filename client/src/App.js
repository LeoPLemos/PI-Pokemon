import './App.css';
import { Route, Switch } from "react-router-dom";
import Pokemons from './components/views/Pokemons';
import DetailPokemon from './components/views/DetailPokemon'
import Create from './components/views/Create';
import LandingPage from './components/views/LandingPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Pokemons} />
        <Route exact path="/pokemon/:id" component={DetailPokemon} />
        <Route exact path="/create" component={Create} />
      </Switch>
      
    </div>
  );
}

export default App;
