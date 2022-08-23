import { Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/store'
import useStyles from '../utils/styles'


export default function Login() {
    const router = useRouter();
    const {redirect} = router.query
    const {state, dispatch} = useContext(Store)
    const {userInfo} = state;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const classes = useStyles()
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post('/api/users/login', {
            email,
            password,
          });
          dispatch({ type: 'USER_LOGIN', payload: data });
          Cookies.set('userInfo', JSON.stringify(data));
          router.push(redirect || '/');
          alert('succss login');
        } catch (err) {
          alert(err.response.data ? err.response.data.message : err.message);
        }
      };
      useEffect(() => {
        if (userInfo) {
          router.push('/');
        }
      }, []);
  return (
    <Layout title="Login">
        <form 
        className={classes.form}
        onSubmit={submitHandler}
        >
            <Typography component="h1" variant="h1">
                Login
            </Typography>
            <List>
                <ListItem>
                    <TextField variant='outlined'
                     fullWidth
                     id='email'
                     label="Email"
                     onChange={(e) => setEmail(e.target.value)}
                     inputProps={ {type: "email"} }
                      ></TextField>
                </ListItem>

                <ListItem>
                    <TextField variant='outlined'
                     fullWidth
                     id='password'
                     label="Password"
                     onChange={(e) => setPassword(e.target.value)}
                     inputProps={{type: "password"}}
                      ></TextField>
                </ListItem>

                <ListItem>
                    <Button variant='contained' type='submit' fullWidth color='primary'>
                        Login
                    </Button>
                </ListItem>

                <ListItem>
                    <p>Dont have an acccount?</p> {''}  <Link href='/register'>Register</Link>
                </ListItem>
            </List>
        </form>
    </Layout>
  )
}
