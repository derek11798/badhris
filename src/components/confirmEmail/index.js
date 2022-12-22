import React, {useState, useEffect} from "react";
import { useParams, useNavigate, useMatch } from 'react-router-dom';


const ConfirmEmail = () => {
    const [confirmEmail, setConfirmEmail] = useState(false)
    const [confirmEmailApiResponse, setConfirmEmailApiResponse] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams();
    useEffect(()=>{
      confirmEmailApi()},[])

    function confirmEmailApi(){
        const urlParams = id.split("|")
        const email = urlParams[0]
        const token = urlParams[1]
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                emailid: email,
                verTok: token,
            }),
          };
          fetch("https://lifograf.com/lg_api/verifyEmail", requestOptions)
          .then((response) => response.json())
          .then((responseJSON) => {
            const responseMessage = (responseJSON.message).split("-")
            setConfirmEmailApiResponse(responseMessage[0])
            if(!responseJSON.error){
              navigate("/login")
            }
            })
            .catch((e) => {
              console.log("catch",e);})
    }

    

    return(
      <div>
        {confirmEmailApiResponse && 
          <div>{confirmEmailApiResponse}</div>}
      </div>
    )
}
export default ConfirmEmail