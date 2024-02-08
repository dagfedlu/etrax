import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "@/lib/prisma"
import { NextResponse, NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  const { email, password }: any = await req.json()
  console.log({ email, password })
  const salt = bcrypt.genSaltSync()

  let user: any

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (e) {
    return NextResponse.json({ error: "User already exists" }, { status: 401 })
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    "hello",
    { expiresIn: "8h" }
  )

  // res.setHeader(
  //   "Set-Cookie",
  //   cookie.serialize("TRAX_ACCESS_TOKEN", token, {
  //     httpOnly: true,
  //     maxAge: 8 * 60 * 60,
  //     path: "/",
  //     sameSite: "lax",
  //     secure: process.env.NODE_ENV === "production",
  //   })
  // )

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
  return res
}
