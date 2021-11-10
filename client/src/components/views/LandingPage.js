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
                <img className="logo_Portal" src={logo} alt='' data-testid="logo_Portal"/>
            </div>
            <span className="landing_title">Welcome to Pokemon's App!</span>
            
            <div>    
                <img className="characters" src={characters} alt='' data-testid="characters"/>
            </div>
            <Link to='/home'>
                <button className="start_button">Start</button>
            </Link> 
        </div>
    )
}