import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout } from '../../redux/authReducer';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import s from './Header.module.css';

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

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
          <Button onClick={() => dispatch(logout())} color="inherit">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
