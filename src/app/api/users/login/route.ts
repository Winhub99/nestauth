import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
connect()

export async function POST(request:NextRequest){
try {
 //extract username password from reqbody
 //find user in db
 //dcrypt password in db and compare with pass in body
 //if matched send response
 const {email,password} = await request.json();   
 const user= await User.findOne({email});
 if(!user){
    return NextResponse.json({error:"User not Found.Please register "},{status:400})
 }
 
 const isPasswordEqual= await bcryptjs.compare(password,user.password)

 if(!isPasswordEqual){
    return NextResponse.json({error:"Credentials didn't match"},{status:400})
 }

 const tokenData = {
    id:user._id,
    username:user.username,
    email:email,
 }
 const token = jwt.sign(tokenData,process.env.SECRET!,{expiresIn:"1h"})
 const response= NextResponse.json({
    message:"Login successfull",
    success:true
 })
 response.cookies.set("token",token,{httpOnly:true})

 return response;

} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
}
}