import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/UserModel'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helpers/mailer'

import { NextRequest, NextResponse } from 'next/server'
import { log } from 'console'
connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        //validation
        console.log("here are user details before search in db: ");
        
        console.log(reqBody);
        const user = await User.findOne({email})
        console.log("the user details are : ")
        console.log(user);
        
        if (user) {
            NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const userWithEncryptPassword= new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await userWithEncryptPassword.save()
        console.log(savedUser);
        

        //send verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            savedUser
        })
        


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}