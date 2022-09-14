import React, { Component } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { Box, Container }from "@mui/material";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

class AdminLayout extends Component {

  render(){
    
    return (
      <>
        {/* Content Views */}
        <Container component={Box} sx={{ marginTop: '65px' }} maxWidth="xl">
          <Outlet />
        </Container>
      </>
    );
  }
};

const mapStateToProps = state => ({
});

const bindActions = dispatch => ({
});

export default connect( mapStateToProps, bindActions )(withRouter(AdminLayout));