import React, { useEffect }   from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllPokemons, getTypes } from "../../store/actions";



export default function LandingPage(){
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getAllPokemons(), getTypes())
    }, [dispatch]);


    return(
        <div>
            <h2>Welcome to Pokemon's World</h2>
            <br/>
            <Link to='/home'>
                <button>START</button>
            </Link> 



        </div>
    )
}