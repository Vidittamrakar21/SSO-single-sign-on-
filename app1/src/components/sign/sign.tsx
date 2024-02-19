
"use client"

import './sign.css'
import React from 'react';
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
    if(redirecturl){
        seturl(redirecturl)
        if(token){
            window.location.href = `${redirecturl}?token=${token}` 
        }
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
            const newuser =  await (await axios.post('http://localhost:8080/api/signuser',{email: email , name: name })).data;
            console.log(newuser)
         
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


    // const signinwithemail = async () =>{
    //    a.opencom();
    //    a.closelog()

    // }
    
    
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

               

                {/* <div className="coon" onClick={openemail}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="grey" viewBox="0 0 16 16">
                 <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                 </svg>

                 <h4>Continue with Email</h4>
                </div> */}
                
                <h5 id='terms'>I agree to the <span>Terms & Conditions</span> & <span>Privacy Policy</span></h5>

            </div>

        </div>
    )
}   


export default Signpage;