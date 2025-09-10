"use server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Signup body:", body);

    const { name, email, password, confirmPassword } = body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user - Make sure field names match your Prisma schema
    const newUser = await prisma.user.create({
      data: { 
        Name: name,  // Use lowercase 'name' to match your schema
        email: email, 
        password: hashedPassword 
      },
      select: { id: true, Name: true, email: true },
    });

    // FIX: Properly handle JWT_SECRET
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email }, 
      JWT_SECRET, 
      { expiresIn: "1h" }
    );

    return NextResponse.json({ 
      message: "Signup successful", 
      user: newUser, 
      token 
    });

  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}