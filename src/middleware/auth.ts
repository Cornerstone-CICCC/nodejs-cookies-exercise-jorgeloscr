import {NextFunction,Request,Response}from 'express'

export const checkAuth =(req:Request,res:Response, next: NextFunction)=>{
    const {authToken}=req.signedCookies
    if(authToken==='admin123'){
        next()
    }else{
        res.redirect('/login')
    }
}

//check authoToken cookie for the login page

export const checkLoginAuth = (req: Request,res:Response, next:NextFunction)=>{
    const { authoToken} =req.signedCookies
    if(authoToken ==='admin123'){
        res.redirect('/profile')
    }else {
        next()// if not it will continue to the login page
    }
}