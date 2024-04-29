import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/UserModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){
//extract data from token

const userId = await getDataFromToken(request);

const user = await User.findOne({_id:userId}).select("-password")

if(!user){
    return NextResponse.json({error:"User not found",success:false},{status:400})
}

return NextResponse.json({
    message:"User Found",
    success:true,
    data:user
},{status:200})
}