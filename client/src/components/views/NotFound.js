import React from "react";
import notFound from '../../assets/notFound.png';


export default function NotFound(){
    
    return(
        <div>
            <div>
                <h2>404 Pokemon not found</h2>
            </div>
            <div>
                <img  width="400px" src={notFound} alt='not found' />
            </div>
        </div>
    )


}