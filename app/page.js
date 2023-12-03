'use client'
import Login from "@/components/Authentication/Login";
import SignUp from "@/components/Authentication/SignUp";
import { useSelector } from 'react-redux'
export default function Home() {
  const user = useSelector((state) => state.auth.user)
  return (
    <>
      {user === null ? <SignUp /> : <Login />}
    </>
  )
}
