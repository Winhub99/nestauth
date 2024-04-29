import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";


connect()

export async function POST(request:NextRequest){

    try {
        //extract token from req body
        //find user in db with this token and expiry gt current date
        //update user fields isVerified
        //remove verify related fields from user
        //update in db
        const reqBody = await request.json();
        const {verifyToken} = reqBody;
        console.log("token is : ",verifyToken);
        
        const user =await User.findOne({verifyToken:verifyToken, verifyTokenExpiry:{$gt: Date.now()}}) 

        if(!user){
            return NextResponse.json({error:"Invalid Token!"},{status:400})
        }
        console.log(user)
        user.isVerified= true;
        user.verifyToken= undefined;
        user.verifyTokenExpiry= undefined;

        await user.save();
        return NextResponse.json({message:"User verified!",success:true},{status:200})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}