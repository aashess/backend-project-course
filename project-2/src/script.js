
import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

const app = express()

const PORT = process.env.PORT || 8383

// takes current file path suppose /Users/aashishjha/Documents/programming/backend-project/project-2/src/script.js

const __filename = fileURLToPath(import.meta.url)

// this takes absoulte path from __filename by removing script.js

const __dirname = dirname(__filename)

// set the absoulte value to public file.
app.use(express.json())

app.use(express.static(path.join(__dirname,'../public')))

// send response index.html as a response.

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'../public' ,'login.html'))

})

app.use('/auth',authRoutes)
app.use('/todos',todoRoutes)



app.listen(PORT, () => {
    console.log(`Server is Started at PORT ${PORT}`)
})