import Cookies from 'js-cookie'
import { useEffect ,useState} from 'react';
import axios from 'axios';
import '../../App.css'


export default function Home () {
    const [login, islogin] = useState<boolean>(false)
  const [username, setuname] = useState("")
  const [usermail, setumail] = useState("")

  const navigateuser  = () =>{
      if(!login){
        window.location.href = 'https://ssoapp1.netlify.app/sign?next=https://ssoapp3.netlify.app/'
      }
      else{
        alert("You are already Signed In !")
      }
     
  }

  const checkvalidity = async (token: string) =>{
    const isvalid = await (await axios.post('https://sso-server-three.vercel.app/api/finduser',{token: token })).data;
    console.log(isvalid);
            setumail(isvalid.data.email)
            setuname(isvalid.data.name)

}

const handlelogout = () =>{
  Cookies.remove('token')
  window.location.href = 'https://ssoapp1.netlify.app/sign?next=https://ssoapp3.netlify.app/&logout=true'


}

  useEffect(()=>{
    const token = Cookies.get('token')
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mytoken = urlSearchParams.get('token');
    const islogout = urlSearchParams.get('logout');
    const redirecturl = urlSearchParams.get('next');
    if(mytoken){
            Cookies.set('token', mytoken, {expires: 3})
            window.location.href = `https://ssoapp3.netlify.app/` 
        
    }

    if(token){
      islogin(true)
      checkvalidity(token)
    }

    if(islogout){
        const token  = Cookies.get('token')
        if(token){
           Cookies.remove('token')
           window.location.href = `${redirecturl}`
        }
        else{
            alert("You are not Signed In !")
           }
  }

  },[])


  return (
    
    <div id='home'>
      <h1>This is Application 3</h1>
      <div id='buttons'>
      <button id='but' onClick={navigateuser}>{login? "You are Signed In." : "Sign In"}</button>
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