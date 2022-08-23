import { AppBar, Container, createTheme,  Switch,  Toolbar, Typography } from '@mui/material'
import Head from 'next/head'
import React, { useContext, useState } from 'react'
import useStyles from '../utils/styles'
import Link from 'next/link'
import {  Badge, Button, CssBaseline, Menu, MenuItem, ThemeProvider } from '@material-ui/core'
import { Store } from '../utils/store'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'



export default function Layout({children, title}) {
  const router = useRouter()
  const {state, dispatch} = useContext(Store)
  const {darkMode, cart, userInfo} = state;
  const classes = useStyles();
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '2rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: '#00796b',
      },
      secondary: {
        main: '#ff9800',
      },
    },
  });
  
  const darkModeChangeHandler = () =>{
    dispatch({type: darkMode ? "DARK_MODE_OFF": "DARK_MODE_ON"})
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF")
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
    
  return (
   
    <div>
      <Head>
        <title> {title ? `${title} -Amirroff`: "Amirrroff"} </title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <AppBar position='static'className={classes.navbar}>
        <Toolbar>
          <Link href="/">
            <a>
              <Typography className={classes.brand}>Amirrroff</Typography>
            </a>
          </Link>
          <div className={classes.grow}></div>
            <div>
              <Switch checked={darkMode}
               onChange={darkModeChangeHandler}
               >
               </Switch>
              <Link href="/cart">
                <a>
              {cart.cartItems.length > 0 ? (<Badge color='secondary' badgeContent={cart.cartItems.length}>Cart</Badge>)
                : ("Cart")}
                </a>
              </Link>
              <Link href="/login">
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                    <MenuItem onClick={loginMenuCloseHandler}>My account</MenuItem>
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Link href="/login">
                  <a>Login</a>
                </Link>
              )}
              </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>
      {children}
      </Container>
      <footer className={classes.footer}>
        <Typography>
          All right reserved
        </Typography>
      </footer>
      </ThemeProvider>
    </div>
  )
}

