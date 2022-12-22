import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { SvgIcon } from '@mui/material';
import Typography from "@mui/material/Typography";
import { Box } from '@mui/system';



const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  width: "100%",
  height: "100%",
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#B6C2EA',
  borderColor: '#F4F4F4',
  borderRadius: 50,
  '&:hover': {
    backgroundColor: '#F4F4F4',
    borderColor: '#F4F4F4',
    boxShadow: 'none',
    color: "#B6C2EA",
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#F4F4F4',
    borderColor: '#B6C2EA',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

export default function NewStoryBtn(props) {
  return (
    // <Stack spacing={2} direction="row">
    //   <ColorButton variant="contained">Custom CSS</ColorButton>
    <Box item sx={{width: `${props.width}`, height: `${props.height}`}} onClick={() => props.clickFunction(true)}>
      <BootstrapButton variant="contained" disableRipple>
        <Typography sx={{color : "#444B59", fontWeight : "bold", justifyContent : "center"}}>Create New Lifograf</Typography>
      </BootstrapButton>
    </Box>
    // </Stack>
  );
}
