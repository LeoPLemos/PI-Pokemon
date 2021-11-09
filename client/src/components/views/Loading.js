import React from "react";
import pokeBall from '../../assets/pokeBall.png';
import './Loading.css';


export default function Loading(){
    
    return(
        <div>
            <div>
                <img id='spinner' width="400px" src={pokeBall} alt='pokeball' />
            </div>
            <div>
                <h2>Loading...</h2>
            </div>
        </div>
    )


}