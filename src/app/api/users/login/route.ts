import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(reqBody);
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        console.log("User Exist");
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , { expiresIn: '1h'})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token , {
            httpOnly: true
        })
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}