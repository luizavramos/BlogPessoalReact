import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {Typography, Grid } from '@material-ui/core';
import { Box } from '@mui/material';
import {useSelector} from 'react-redux';
import {TokenState} from '../../../store/tokens/tokensReducer'
import './Footer.css'

function Footer() {

    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    var footerComponent;

    if(token != ""){
        footerComponent = <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid alignItems="center" item xs={12}>
            <Box className='container'>
                <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    
                    <a href="https://github.com/luizavramos" target="_blank">
                        <GitHubIcon className='redes' />
                    </a>
                    <a href="https://www.linkedin.com/in/luiza-ramos-b96a4a160/" target="_blank">
                        <LinkedInIcon className='redes' />
                    </a>
                </Box>
            </Box>
            <Box className='footer'>
                <Box paddingTop={1}>
                    <Typography variant="subtitle2" align="center" gutterBottom className='texto'>© 2022 Copyright:</Typography>
                </Box>
              
            </Box>
        </Grid>
    </Grid>
    }

    return (
        <>
           {footerComponent} 
        </>
    )
}

export default Footer;