const express = require("express")
const config = require("config")
const db = require("./data")
const {resolveAsyncConfigs} = require("config/async");
const app = express()
const PORT = config.get("port")

app.use(express.static(__dirname + "/public"))
app.use(express.json())

app.post("/api/save", async (req, res) => {

    if (!req.body) return res.status(400).json({message: "нечего сохронять"})
    const array = req.body.array

    let queryTextArr = `INSERT INTO arr (arr) VALUES($1) RETURNING id` // Команда для записи массива. Возвращает id массива
    let queryTextNumber = `INSERT INTO numbers (number,arrays_id) VALUES($1,$2) RETURNING *`// Команда для записи числа. Возвращает все элементы записи

    const resultArr = await db.query(queryTextArr, [array]); // Записываем в б/д массив

    for (let i = 0; i < array.length; i++) {
        const resultNumber = await db.query(queryTextNumber, [array[i], resultArr.rows[0].id]); // Записываем в б/д все числа массива по очереди
    }


    res.status(201).json({message:`массив сохранен под id:${resultArr.rows[0].id}`})


})

app.get("/api/search/:id", async (req, res) => {
    const id = req.params.id

    const queryText = `SELECT * FROM arr WHERE id IN ($1);`
    const result = await db.query(queryText, [id]);// Запрос в б/д. Посик массива по его id

    if (!result.rows[0]){
        return res.status(400).json({message:`Массива под id:${id} не найден!`})
    }
    res.status(200).json({"id":result.rows[0].id,"array":result.rows[0].arr})
})

app.get("/api/searchitem/", async (req, res) => {
    const id = req.query.id
    const index = req.query.index

    const queryText = `SELECT * FROM numbers WHERE arrays_id IN ($1);`
    const result  = await db.query(queryText, [id])// Запрос в б/д. Посик элемента массива по id массива

    res.status(200).json({id:result.rows[index].arrays_id,number:result.rows[index].number})

})

app.listen(PORT, () => {
    console.log(`Server run to localhost:${PORT}`)
})
