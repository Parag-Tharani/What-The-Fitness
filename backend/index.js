const express = require("express")
const cors = require("cors")
const connectDatabase = require("./database")

const Port = 8080

const app = express()


app.use(express.json())
app.use(cors())

app.get(('/'), (req,res) => {
    res.send("Welcome Guests")
})


connectDatabase()
.then(() => {
    app.listen(8080, () => {
        console.log(`Database initialized at http://localhost:${Port}`)
    })
})
.catch((err) => console.log("Error Connecting Database"))
