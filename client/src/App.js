import './App.css';
import { Route } from "react-router-dom";
import Pokemons from './components/Pokemons';
import Search from './components/elements/Search';
import DetailPokemon from './components/DetailPokemon'
import Create from './components/views/Create';
import FilterType from './components/elements/FilterByType';
import FilterCreate from './components/elements/FilterByCreator';

// import Detail from './components/views/Detail';



function App() {
  return (
    <div className="App">
      <Route exact path="/home" component={Search}/>
      <Route exact path="/home" component={Pokemons} />
      <Route exact path="/pokemon/:id" component={DetailPokemon} />
      <Route exact path="/create" component={Create} />
      <Route exact path="/filter" component={FilterType} />
      <Route exact path="/creator" component={FilterCreate} />
        
      
    </div>
  );
}

export default App;
