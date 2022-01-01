import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {

  const handleTitleClick = () =>{
    document.location.href = "/";
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleTitleClick}>
            E-Health
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
