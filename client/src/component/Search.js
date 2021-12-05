import React, {useRef, useState} from 'react';
import {resolveAsyncConfigs} from "config/async";

const Search = () => {
    const inputEl = useRef(null);
    const [array, setArray] = useState([])
    const [items, setItems] = useState([array])

    const onSubmit = async (event) => { // Отправка формы
        event.preventDefault()
        let id = inputEl.current.value
        if (!id){
            return alert("Введите id")
        }
        const response = await fetch(`/api/search/${id}`, { // Асинхронный GET запрос к серверу
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            method: "GET",
        })
        const result = await response.json() // Читаем ответ от сервера в формате json

        if (!response.ok){// Если запрс выполнился удачно то выводим ответ на экран
            return alert(result.message)
        }
        setArray([result.id,result.array])
        setItems((postArray)=>[...postArray, array])
    }


    return (
        <div className={"valign-wrapper"}>
            <div className="row center-align">
                <form className="col s11 m12" onSubmit={onSubmit}>
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <input id="input_text1" type="text" className=" white-text"
                                   placeholder="введите id массива" ref={inputEl}/>
                        </div>
                        <div className="card-action">
                            <button className="waves-effect waves-light btn" type="submit">Найти</button>
                        </div>
                        <div className="card-content white-text">
                            <table className="table  white-text">
                                <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>массив</th>

                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    {
                                        array.map(item=> {
                                            return(
                                                <td key={item}>{item}</td>
                                            )
                                        })
                                    }
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </form>
            </div>
        </div>

    );
};

export default Search;