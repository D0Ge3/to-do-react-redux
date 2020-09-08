import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';

const Header = ({ isAuth, logout }) => {
  return (
    <AppBar position="static" className={s.header}>
      <Toolbar className={s.bar}>
        <Typography variant="h6">
          <NavLink className={s.link} to="/todo">
            ToDo APP
          </NavLink>
        </Typography>
        {!isAuth && (
          <Button color="inherit">
            <NavLink className={s.link} to="/login">
              Login
            </NavLink>
          </Button>
        )}
        {isAuth && (
          <Button onClick={logout} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
// Надо бы переехать на хуки useSelector и useReducer, чтобы не городить такой массивной логики
export default connect(mapStateToProps, { logout })(Header);
