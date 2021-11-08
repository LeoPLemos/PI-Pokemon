import React, { useEffect }   from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPokemons, getTypes } from "../../store/actions";
import './LandingPage.css';
import logo from '../../assets/logo.png'
import characters from '../../assets/characters.png'



export default function LandingPage(){
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getAllPokemons(), getTypes())
    }, [dispatch]);


    return(
        <div>
            <div>
                <img className="logo_Portal" src={logo} alt=''/>
            </div>
            <span className="landing_title">Welcome to Pokemon's App!</span>
            
            <div>    
                <img className="characters" src={characters} alt=''/>
            </div>
            <Link to='/home'>
                <button>START</button>
            </Link> 



        </div>
    )
}