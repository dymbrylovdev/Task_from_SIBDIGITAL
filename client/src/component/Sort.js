import React, {useRef} from 'react';

const Sort = () => {
    const inputEl = useRef(null);

    const onButtonClick = (event) => {

        let input = inputEl.current
        if (!input.value) return alert("Заполните поля!")

        let valueInput = input.value.split("")

        for (let i = 0; i < valueInput.length; i++) {
            for (let j = 0; j < valueInput.length; j++) {
               if(Object.is(Number(valueInput[j]),NaN)){
                   return alert("Неккоректные данные!")
               }
                if (valueInput[j] > valueInput[j+1]){
                    let maxNum = valueInput[j]
                    valueInput[j] = valueInput[j+1]
                    valueInput[j+1] = maxNum
                }
            }
        }
        input.value = valueInput.join("")
    };


    const onSubmit =async (event) => {
        event.preventDefault()

        let input = inputEl.current
        if (!input.value) return alert("Заполните поля!")

        let valueInput = input.value.split("")

        for (let i = 0; i < valueInput.length; i++) {
            for (let j = 0; j < valueInput.length; j++) {
                if(Object.is(Number(valueInput[j]),NaN)){
                    return alert("Неккоректные данные!")
                }
            }
        }
        let array = event.target[0].value

        const response = await fetch("/api/save", { // Асинхронный POST запрос к серверу
            method: "POST",
            headers: {"Accept": "application/json", "Content-Type": "application/json"},
            body: JSON.stringify({
                array: [...array]
            })
        })
        const result = await response.json() // Читаем ответ от сервера в формате json

        if(response.ok){ // Если запрс выполнился удачно то выводим ответ на экран
            alert(result.message)
        }

    }

    return (
        <div className={"valign-wrapper"}>
            <div className="row center-align">
                <form className="col s12 " onSubmit={onSubmit}>
                    <div className={"row"}>
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <input id="input_text" type="text" className=" white-text"
                                       placeholder="введите массив чисел" ref={inputEl}/>
                            </div>
                            <div className="card-action">
                                <a className="waves-effect waves-light " onClick={onButtonClick}>Сортировать</a>
                                <button className="waves-effect waves-light btn" type="submit">Сохранить</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
        ;
};

export default Sort;