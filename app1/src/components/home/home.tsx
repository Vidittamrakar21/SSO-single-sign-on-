import "./home.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Cookies  from "js-cookie"



export default function Home(){
        const router = useNavigate()

        const handleclick = () => {
            if(!login){
                router('/sign')
            }
            else{
                alert("You are already Signed In !")
              }
            
        }



        const [login, islogin] = useState<boolean>(false)
        const [username, setuname] = useState("")
        const [usermail, setumail] = useState("")

 
        const checkvalidity = async (token: string) =>{
            const isvalid = await (await axios.post('https://sso-server-three.vercel.app/api/finduser',{token: token })).data;
            console.log(isvalid);
            setumail(isvalid.data.email)
            setuname(isvalid.data.name)
        }

        const handlelogout = () =>{
           const token  = Cookies.get('token')
           if(token){
            Cookies.remove('token')
            window.location.href =  'https://ssoapp2.netlify.app/check?next=https://ssoapp3.netlify.app/check&logout=true'
           }
           else{
            alert("You are not Signed In !")
           }
        }

       useEffect(()=>{ 
        const token = Cookies.get('token')
        if(token){
            islogin(true);
            checkvalidity(token)
        }
       
        },[])

    return(
        <div id='home'>
        <h1>This is Application 1</h1>
        <div id='buttons'>
      <button id='but' onClick={handleclick}>{login? "You are Signed In." : "Sign In"}</button>
      <button id='but' onClick={handlelogout}>Logut</button>
      </div>

      {login?<>
       <div id='tags'>
       <h3>{usermail}</h3>
        <h3>{username}</h3>
       </div>
      </>:<></>}
      </div>
    )
}