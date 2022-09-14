import React, { Component } from "react";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";

import boxShadows from "../assets/theme/box-shadow.js";
import EquiposTable from "./components/EquiposTable.js";

class Home extends Component {
    _isMounted = false;

    constructor(props){
        super(props);
        this.state ={
        }
    }

    async componentDidMount(){
        this._isMounted = true;

    }

    async componentDidUpdate(prevProps){
        if(this._isMounted){

        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render(){
        
        return(
            <Box sx={{overflowX: 'hidden', overflowY: 'hidden' }}>
                <Box sx={{ padding: '0px 50px', flexDirection: 'column', justifyContent: 'center' }} >
                    <Box sx={{ display: 'flex', padding: '2px' }}>
                        <Box sx={{ backgroundColor: '#fff', padding: '8px 15px', borderRadius: 2, boxShadow: boxShadows.inputBoxShadow}}>
                            <Typography> Cuentas contables </Typography>
                        </Box>
                    </Box>

                    <EquiposTable />

                </Box>
            </Box>
        );
    }

}

const mapStateToProps = state => ({
});

const bindActions = dispatch => ({
    // setTokenSpotify: data => dispatch(setTokenSpotify(data)),
    
});

export default withCookies(connect( mapStateToProps, bindActions )(Home));