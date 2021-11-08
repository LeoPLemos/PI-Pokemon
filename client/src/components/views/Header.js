import React from 'react';
import { Link } from 'react-router-dom';
import FilterByCreator from '../elements/FilterByCreator';
import FilterByType from '../elements/FilterByType';
import Order from '../elements/Order';
import Search from '../elements/Search';
import { getAllPokemons, resetShowPokemons, } from '../../store/actions';
import './Header.css';
import logo from '../../assets/logo.png'
import { useDispatch } from 'react-redux';



export default function Header({ setCurrentPage, setOrder }){

    const dispatch = useDispatch()
    const handleLoadOnClick = (e)=>{
        dispatch(resetShowPokemons())
        dispatch(getAllPokemons())    
}

    return(
        <div className="header">
            <div className="container_logo">
                <div>   
                    <img className="logo" src={logo} alt="logo_pokemon"/>
                </div>
                <div className="button_leave">
                    <Link to="/">
                        <button>Leave</button>
                    </Link>
                </div>
            </div>
            <div className="tools">
                <div className="filters">
                    <div className="filters_title_container">
                        <div className="filters_title">Filters</div>
                    </div>
                    <div className="filters_container">
                        <div className="filter_by_type">
                            <FilterByType/>
                        </div>
                        <div className="filter_by_creator">   
                            <FilterByCreator/>
                        </div>
                    </div>
                    <div>
                        <button className="clear_button" onClick= {handleLoadOnClick}>Clear Filters</button>
                    </div>
                </div>
                <div className="search_create_container">
                    <div className="search">
                        <Search/>
                    </div>
                    <div className="create">
                        <Link to="/create">
                            <button>Create Pokemon</button>
                        </Link>
                    </div>
                </div>
                <div className="order_container">
                    <div className="order_title">Order</div>
                    <Order
                        setCurrentPage={setCurrentPage}
                        setOrder={setOrder}
                    />
                </div>
            </div>
        </div>

    )
}