import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  // same as signup // accept cred
  const { email, password }: any = await req.json()
  // compare with user on db
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      "hello",
      { expiresIn: "8h" }
    )
    //   user exists, token is assigned
    // now set token to header
    const res = NextResponse.json({ user, token }, { status: 201 })
    res.cookies.set({
      name: "TRAX_ACCESS_TOKEN",
      value: token,
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    // send user back // for UI
    return res
  } else {
    const res = NextResponse.json({ error: "Email or Password is wrong" })
    return res
  }
}
