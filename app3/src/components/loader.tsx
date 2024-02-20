import "../App.css"
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie'
import { useEffect  } from "react";

export default function Check () {
 

  useEffect(()=>{
    // const token = Cookies.get('token')
    const urlSearchParams = new URLSearchParams(window.location.search);
    const mytoken = urlSearchParams.get('token');
    const islogout = urlSearchParams.get('logout');
    const redirecturl = urlSearchParams.get('next');
    if(mytoken){
            Cookies.set('token', mytoken, {expires: 3})
            window.location.href = `https://ssoapp3.netlify.app/` 
        
    }



    if(islogout){
      Cookies.remove('token')
      window.location.href = `${redirecturl}`
  }

},[])

  return(
    <div id="outer">
        <div id="loader">
    <ClipLoader color="#36d7b7" loading={true} size={45}/>
</div>
    </div>
  )
}