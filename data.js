const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password:"reversepolarity",
    host: "localhost",
    port:5432,
    database: "arraysdb"
})

module.exports = pool