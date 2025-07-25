import { connect } from '@/dbConfig/dbConfig'; 
import { NextRequest, NextResponse } from 'next/server';


connect();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0) // Set the cookie to expire immediately
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}