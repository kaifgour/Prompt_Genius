"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut , userSession, getProviders} from 'next-auth/react'
import { set } from "mongoose";

const Nav =()=>{

    const isUserloggedIn =true;
    const [Providers, setProviders] = useState(null);
    const [toggleDropdown,setToggleDropdown] = useState(true);

    useEffect(()=>{
        const SetProvider = async () =>{
            const response = await getProviders();
            setProviders(response);
        }

        SetProvider();
    },[])

    return(
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center">
            <Image src='/assets/images/logo.svg' alt="logo" width={30} height={30} className="object-contain"></Image>
            <p className="logo_text">PromptGenius</p>
            </Link>
            <div className="sm:flex hidden">
                {isUserloggedIn?(
                    <div className="flex gap-3 md:gap-5">
                        <Link href='/create-prompt' className="black_btn">Create Post</Link>

                        <button type="button" className="outline_btn">Sign Out</button>
                        <Link href='/profile'>
                        <Image src="/assets/images/logo.svg" width={37} height={37}/>
                        </Link>
                    </div>
                ):(
                    <>
                    {Providers && Object.values(Providers).map((Providers)=>(
                        <button type="button" onClick={()=>{Providers.name}} key={Providers.id} className="black_btn">
                        Sign In
                        </button>)
                    )}
                    </>
                )
            }
            </div>

            {/* mobile-navigation */}
            <div className="sm:hidden flex relative">
                {
                    isUserloggedIn?(
                        <div className="flex gap-3 md:gap-5">
                        <Image src="/assets/images/logo.svg" width={37} height={37} className="rounded-full" alt="profile" onClick={()=>setToggleDropdown((prev)=>!prev)}/>
                        {/* {console.log(toggleDropdown)} */}
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link href="/profile" className="dropdonw_link" onClick={()=>setToggleDropdown(false)}>My Profile</Link>
                                <Link href="/profile" className="dropdonw_link" onClick={()=>setToggleDropdown(false)}>Create Prompt</Link>
                                <button type="button" className="mt-5 w-full black_btn" onClick={()=>{
                                    setToggleDropdown(false); signOut();
                                }}>Sign Out </button>
                            </div>
                        )}
                    </div>
                    ):
                    ( 
                    <>
                    {Providers && Object.values(Providers).map((Providers)=>(
                        <button type="button" onClick={()=>{Providers.name}} key={Providers.id} className="black_btn">
                        Sign In
                        </button>)
                    )}
                    </>
                    )
                }
            </div>

        </nav>

    )
}

export default Nav