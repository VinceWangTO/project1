import React, { Component } from 'react';
import { connect } from 'react-redux';
export const require_auth = (ComposedComponent) => {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/');
      }
      // if(localStorage.getItem('auth')===null){
      //     this.props.history.push('/');
      // }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
      // if(localStorage.getItem('auth')===null){
      //     this.props.history.push('/');
      // }
    }
    render() {
      //console.log(this.props);
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state) => {
    return { authenticated: state.authenticated };
  };
  return connect(mapStateToProps)(Authentication);
};
export default require_auth;
