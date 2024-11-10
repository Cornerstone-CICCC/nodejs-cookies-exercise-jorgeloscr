import express, {Request, Response} from "express"
import cookieParser from "cookie-parser"
import path from "path"
import pageRouter from './routes/page.routes'

const app = express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'../src/views'))
app.use(cookieParser());
app.use(cookieParser(process.env.COOKIE_KEY))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/',pageRouter)

app.use((req:Request,res:Response)=>{
    res.status(404).render("notFound")
})

const PORT:number= Number(process.env.PORT || 4000)

app.listen(PORT,()=>{
    console.log(`Port running in port ${PORT}`)
})