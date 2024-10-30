"use client"; 

import React, { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Page = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
        loading: false,
        err: [],
    });

    const LoginFun = async (e) => {
        e.preventDefault();
        setLogin({ ...login, loading: true, err: [] });

        try {
            const response = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: login.email,
                    password: login.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors.join(", ") || "Login failed");
            }

            const data = await response.json();
            setLogin({ ...login, loading: false, err: [] });

           
            Cookies.set("auth", JSON.stringify(data), { expires: 1 }); // Set cookie for 1 day
          const auth=  Cookies.get("auth")
          console.log(auth)

            
            window.location.href = '/';
        } catch (error) {
            setLogin({
                ...login,
                loading: false,
                err: [error.message],
            });
        }
    };

    


  return (
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
        <h2 className="text-2xl text-[#fbfbfb] font-bold text-foreground text-center  mb-2">Welcome Back</h2>
       

        <form on onSubmit={LoginFun}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#fbfbfb] text-muted-foreground mb-1">Email Address</label>
            
            <input
              type="email"
              id="email"
              value={login.email}
               className="w-full bg-[#121212]  text-white p-2 rounded-lg focus:outline-none focus:ring focus:ring-ring"
              placeholder="email address"
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
               autoComplete="email"
              required

            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="password" className="block text-[#fbfbfb] text-muted-foreground mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
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
            Login
          </button>
        </form>

        <div className="flex items-center justify-between my-4">
          <hr className="flex-grow border-muted" />
          <span className="text-muted-foreground mx-2">OR</span>
          <hr className="flex-grow border-muted" />
        </div>

        <p className="text-muted-foreground text-[#fbfbfb] text-center mb-6">
          Don't have an account yet?{' '}
          <Link  href={"/Register"} className="text-primary hover:underline text-[#fbfbfb]">Sign up</Link>
        </p>
      </div>
    </div>
  );
};



      
 export default Page;   