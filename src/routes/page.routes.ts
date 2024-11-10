import { Router, Request,Response } from "express";
import{ checkAuth, checkLoginAuth} from "../middleware/auth"
import{users} from "../types/user"


const pageRouter= Router()
let userLogin : users[]

userLogin=[
    {username: 'authToken', password:"admin123"},
    {username: 'guest', password:"guest123"}
]

pageRouter.get('/',checkLoginAuth,(req:Request,res:Response)=>{
    res.status(200).render("index")
})

pageRouter.get('/login',(req:Request,res:Response)=>{
    res.status(200).render("login")
})

pageRouter.post('/login',(req:Request<{},{},users>, res:Response)=>{
    const {username, password} = req.body
    const found= userLogin.find(user=> user.username === username && user.password === password)
    if(found){
        res.cookie('authToken', 'admin123',
    {
        maxAge:3*60*100, 
        httpOnly: true,
        signed: true
    })
    res.redirect('/profile')
    
}else{
    res.redirect('/login')
}
})

pageRouter.get('/profile',checkAuth,(req:Request,res:Response)=>{
        
        res.status(200).render('/profile')  
})

pageRouter.get('/logout',(req:Request,res:Response)=>{
    res.clearCookie("authToken")
    res.clearCookie("user_info")
    
    res.redirect("/")
})





export default pageRouter