"use client"
import React, { useState } from "react";
import Cookies from "js-cookie"; 
import Link from "next/link";
const Page=()=>{
    const [registra ,setregistra]=useState({
        name:"",
        email:"",
        password:"",
        loading:false,
        err:[]

    })
   
    const registraFun= async(e)=>{
        e.preventDefault();
        setregistra[{...registra,loading:true,err:[]}]
        try{
            const response= await fetch("http://localhost:4000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name:registra.name,
                        email: registra.email,
                        password: registra.password,
                    }),
                    
                }
                
            )
            const data=await response.json();
            setregistra({...registra,loading:false,err:[]})
            Cookies.set("auth", JSON.stringify(data), { expires: 1 });
                
            
        }catch(error){
            setLogin({
                ...registra,
                loading: false,
                err: [error.message],
            });
            console.log(registra.err)
        }
    }
return(
<div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-sm bg-[#191919]">
        <div className="flex items-center justify-center mb-4">
          <img
            aria-hidden="true"
            alt="logo"
            src="https://openui.fly.dev/openui/24x24.svg?text=🔵"
            className="w-12 h-12"
          />
        </div>
        <h2 className="text-2xl text-[#fbfbfb] font-bold text-foreground text-center  mb-2">Welcome!</h2>
       

        <form on onSubmit={registraFun}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-[#fbfbfb] text-muted-foreground mb-1"> Name</label>
            
            <input
              type="name"
              id="name"
              value={registra.name}
               className="w-full bg-[#121212]  text-white p-2 rounded-lg focus:outline-none focus:ring focus:ring-ring"
              placeholder="Name"
              onChange={(e) => setregistra({ ...registra, name: e.target.value })}
               autoComplete="name"
              required

            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#fbfbfb] text-muted-foreground mb-1">Email Address</label>
            
            <input
              type="email"
              id="email"
              value={registra.email}
               className="w-full bg-[#121212]  text-white p-2 rounded-lg focus:outline-none focus:ring focus:ring-ring"
              placeholder="email address"
              onChange={(e) => setregistra({ ...registra, email: e.target.value })}
               autoComplete="email"
              required

            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="password" className="block text-[#fbfbfb] text-muted-foreground mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={registra.password}
                  onChange={(e) => setregistra({ ...registra, password: e.target.value })}
             autoComplete="current-password"
              className="w-full bg-[#121212]   text-white p-2  rounded-lg focus:outline-none focus:ring focus:ring-ring"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-[#fbfbfb] bg-primary text-primary-foreground p-2 rounded-lg hover:bg-primary/80"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between my-4">
          <hr className="flex-grow border-muted" />
          <span className="text-muted-foreground mx-2">OR</span>
          <hr className="flex-grow border-muted" />
        </div>

        <p className="text-muted-foreground text-[#fbfbfb] text-center mb-6">
         If You have an account?{' '}
          <Link  href={"/Login"} className="text-primary hover:underline text-[#fbfbfb]">Sign in</Link>
        </p>
      </div>
    </div>
    )
}
export default Page;