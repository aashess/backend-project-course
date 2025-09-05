import express from 'express'

const app = express()

const PORT = 8383
let data = ['aashish']

app.use(express.json())

console.log("This is node form.");

app.get('/',(req,res) => {
    res.send(`<body style='background:pink; color:blue'>
        <p>
            <h1>Data</h1>
            ${JSON.stringify(data)}
        </p>
        </body>`)
    
})

app.get('/dash', (req,res) => {
    console.log("Yay! You just hit dashboard");
    res.send("Yay! You hit dash.")
})

app.post('/api/data', (req,res) => {
    const newEntry = req.body
    data.push(newEntry.name)    
    // res.sendStatus(201)
    res.send("User data recorded successfully")
})

app.delete('/api/data', (req,res) => {
    data.pop()
    console.log("Data Successfully Deleted");
    res.send("Data Successfully Deleted")
    
})

app.listen(PORT, () => {console.log(`Server is started on: ${PORT}`)})
