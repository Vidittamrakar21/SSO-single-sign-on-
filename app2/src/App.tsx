
import './App.css'
import Cookies from 'js-cookie'
import { useEffect ,useState} from 'react';
import axios from 'axios';

function App() {

  // const router = useNavigate()

  const [login, islogin] = useState<boolean>(false)
  const [username, setuname] = useState("")
  const [usermail, setumail] = useState("")

  const navigateuser  = () =>{
      if(!login){
        window.location.href = 'http://localhost:5173/sign?next=http://localhost:5174/'
      }
      else{
        alert("You are already Signed In !")
      }
     
  }

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
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mytoken = urlSearchParams.get('token');
    if(mytoken){
            Cookies.set('token', mytoken, {expires: 3})
            window.location.href = `http://localhost:5174/` 
        
    }

    if(token){
      islogin(true)
      checkvalidity(token)
    }

  },[])


  return (
    
    <div id='home'>
      <h1>This is Application 2</h1>
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

export default App
