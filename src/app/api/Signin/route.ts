"use server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
const JWT_SECRET = process.env.JWT_SECRET!;
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    return NextResponse.json({
      message: "Signin successful!",
      token,
      user: { id: user.id, Name: user.Name, email: user.email },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
