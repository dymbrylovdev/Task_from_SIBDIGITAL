import React from 'react';
import "./App.css"
import {NavLink, Route, Switch} from "react-router-dom";
import Sort from "./component/Sort";
import Search from "./component/Search";
import SearchItem from "./component/SearchItem";

const App = () => {

    return (
        <div className={"container center"}>
            <h2>Сортировщик массивов</h2>
            <ul className="pagination">
                <li className="waves-effect active m2"><NavLink to="/">Сортировка</NavLink></li>
                <li className="waves-effect active"><NavLink to="/search">Поиск массива</NavLink></li>
                <li className="waves-effect active"><NavLink to="/searchitem">Поиск элементов массива</NavLink></li>
            </ul>
            <Switch>
                <Route exact  path={"/"} component={Sort} />
                <Route path={"/search"} component={Search}/>
                <Route path={"/searchitem"} component={SearchItem}/>
            </Switch>
        </div>


    );
};

export default App;