import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { connect } from "react-redux";


const Gender = ["Male", "Female"]
const titles = ["Mr", "Mrs", "Ms", "Master", "Baby"]
const Deseased = ["Yes", "No"]
const Visiblity = ["Public", "Family"]

 function MobileViewAboutForm(props) {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [nickName, setNickName] = useState();
  const [gender, setGender] = useState();
  const [title, setTitle] = useState();
  const [email, setEmail] = useState();
  const [lgurl, setLgurl] = useState();
  const [deseased, setDeseased] = useState();
  const [visiblity, setVisiblity] = useState();
  const [description, setDescription] = useState();

  const updateForm = ()=>{
    const form_details = 
    {
      lg_url : lgurl,
      email_id : email,
      title : title,
      first_name : firstName,
      last_name : secondName,
      Nickname : nickName,
      short_desc : description,
      deceased : deseased,
      gender : gender,
      Visibility : visiblity
    }
    const requestOptions = {
      method: "POST",
      headers: { "UserId": `${props.userId}`,
                  "token": `${props.authToken}` 
                },
      body: JSON.stringify({basic_details : form_details}),
    };
    fetch("https://lifograf.com/lg_api/lgBasic", requestOptions)
      .then((response) => console.log(response))
  }

  

  return (
        <Box component={"paper"} elevation = {1}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
            m : 1,
            bgcolor : "#FFFFFF"
          }}
          noValidate
          autoComplete="off"
        >
          
            <TextField id="standard-select-currency" label="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} variant="standard"/>
            <TextField id="standard-select-currency" label="Last Name" value={secondName} onChange={(e)=>setSecondName(e.target.value)} variant="standard"/>
            <TextField id="standard-select-currency" label="Nick Name" value={nickName} onChange={(e)=>setNickName(e.target.value)} variant="standard"/>
            <TextField id="standard-select-currency" select label="Gender" value={gender} onChange={(e)=>setNickName(e.target.value)} variant="standard">
              {Gender.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="standard-select-currency" select label="Title" value={title} onChange={(e)=>setTitle(e.target.value)} variant="standard">
              {titles.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="standard-select-currency" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} variant="standard"/>
            <TextField id="standard-select-currency" label="LG Url" value={lgurl} onChange={(e)=>setLgurl(e.target.value)} variant="standard"/>
            <TextField id="standard-select-currency" select label="Deceased" value={deseased} onChange={(e)=>setDeseased(e.target.value)} variant="standard">
              {Deseased.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="standard-select-currency" select label="Visiblity" value={visiblity} onChange={(e)=>setVisiblity(e.target.value)} variant="standard">
              {Visiblity.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          
            <TextField id="standard-select-currency" label="Description" value={description} onChange={(e)=>setDescription(e.target.value)} variant="standard"/>
            <Box textAlign='center'>
            <Button sx={{alignItem : "center", color : "#8699DA"}} onClick={()=>{updateForm()}} variant="text">Save</Button>
            </Box>
        </Box>
        </Box>
  );
}
const mapStateToProp = state =>{
  return {
    authToken: state.commonState.authToken,
    userId: state.commonState.userId,
}
  
  
}
export default connect (mapStateToProp) (MobileViewAboutForm);

