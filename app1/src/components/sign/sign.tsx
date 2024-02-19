
"use client"

import './sign.css'

import { useState,useEffect} from 'react';
import axios from 'axios';
import {auth} from "../../firebase"
import {signInWithPopup , GoogleAuthProvider} from "firebase/auth"

import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

 




function Signpage (){

    const [nexturl, seturl] = useState("");
    const router = useNavigate();
  

 
   useEffect(()=>{ 
    const token = Cookies.get('token')
    const urlSearchParams = new URLSearchParams(window.location.search);
    const redirecturl = urlSearchParams.get('next');
    const islogout = urlSearchParams.get('logout');
    if(redirecturl && !islogout ){
        seturl(redirecturl)
        if(token){
            window.location.href = `${redirecturl}?token=${token}` 
        }
    }

    if(islogout){
        Cookies.remove('token')
        window.location.href = `${redirecturl}`
    }
    //@ts-ignore
  

   },[])
   

    const googleAuth = new GoogleAuthProvider();





  
    const signwithgoogle= async ()=>{
       const result  =  await signInWithPopup(auth, googleAuth);
       console.log(result);
       //@ts-ignore
       console.log(result.user.displayName);
       console.log(result.user.email);
       console.log(result.user.emailVerified);

       const email = (result.user.email)?.toString()
        const name = (result.user.displayName)?.toString()
       if(result.user.emailVerified === true){
            console.log(name)
            console.log(email)

            const existuser =  await (await axios.post('https://sso-server-three.vercel.app/api/exist',{email: email})).data;
            if(existuser.already === true){
                if(existuser.exists.token){
                    Cookies.set("token",existuser.exists.token, {expires: 3})
                    if(nexturl){
     
                        window.location.href = `${nexturl}?token=${existuser.exists.token}` 
                    }
     
                    else{
                     router('/')
                    }
                 }
            }

            else if(existuser.already === false){
                const newuser =  await (await axios.post('https://sso-server-three.vercel.app/api/signuser',{email: email , name: name })).data;
                if(newuser.token){
                    Cookies.set("token", newuser.token, {expires: 3})
                    if(nexturl){
     
                        window.location.href = `${nexturl}?token=${newuser.token}` 
                    }
     
                    else{
                     router('/')
                    }
                 }
            }
        
         
            
       }
       
       
       
    }


 
    
    
    return(
        <div className={true?"outer ":"gayab"}>
            <div className={true?"sign": "gayab"}>
                
                <h3 id='getstart'>Get Started</h3>

             
                <h1 id='headpro'>Sign in, to continue. </h1>
                <div className="coon" onClick={signwithgoogle} >
                    <div id='gog'>
                        <img src="/images/Google Icon.png" alt="" />
                    </div>
                    <h4>Continue with Google</h4>
                </div>

               
                
                <h5 id='terms'>I agree to the <span>Terms & Conditions</span> & <span>Privacy Policy</span></h5>

            </div>

        </div>
    )
}   


export default Signpage;