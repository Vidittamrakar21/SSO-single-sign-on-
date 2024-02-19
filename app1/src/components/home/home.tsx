import "./home.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Cookies  from "js-cookie"
import { reload } from "firebase/auth"


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
            const isvalid = await (await axios.post('http://localhost:8080/api/finduser',{token: token })).data;
            console.log(isvalid);
            setumail(isvalid.data.email)
            setuname(isvalid.data.name)
        }

        const handlelogout = () =>{
            Cookies.remove('token')
            window.location.reload()
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