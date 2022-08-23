import { Button, Card, Grid, Link, List, ListItem, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { Store } from '../utils/store'
import Image from 'next/image'
import { Select } from '@mui/material'
import dynamic from 'next/dynamic'
import axios from "axios"
import {useRouter} from 'next/router'

 function CartScreen() {
    const router = useRouter()
    const {state, dispatch} = useContext(Store)
    const {cart: {cartItems}} = state

    const updateCartHandler = async (item, quantity) =>{
        const {data} = await axios.get(`/api/products/${item._id}`)
        if(data.countInStock < quantity) {
            window.alert("ausverkauft")
            return
        }
        dispatch({ type: 'CART-ADD-ITEM', payload: {...item, quantity}})
    }

    const removeItemHandler = (item) => {
        dispatch({ type: "CART-REMOVE-ITEM", payload: item })
    }
    const checkOutHandler = () =>{
        router.push("/login")
    }
  return (
    <Layout title="shoping Cart">
        <Typography component="h1" variant="h1">Shoping Cart</Typography>
        {cartItems.length === 0 ? (
        <div>
            Cart is empty. <Link href='/'>Go Shopping</Link>
        </div>):
        (
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Quantity</TableCell>
                                    <TableCell align='right'>Price</TableCell>
                                    <TableCell align='right'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cartItems.map((item) =>(
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <Link href={`/product/${item.slug}`}>
                                                <a>
                                                    <Image 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    width={250} 
                                                    height={250}
                                                    ></Image>
                                                </a>
                                            </Link>
                                        </TableCell>

                                        <TableCell>
                                            <Link href={`/product/${item.slug}`}>
                                                <a>
                                                    <Typography>{item.name}</Typography>
                                                </a>
                                            </Link>
                                        </TableCell>

                                        <TableCell align='right'>
                                        <Select 
                                        value={item.quantity}
                                         onChange={(e)=>updateCartHandler(item, e.target.value)}>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                            <MenuItem key={x + 1} value={x + 1}>
                                                {x+ 1}
                                            </MenuItem>
                                            ))}
                                        </Select>
                                        </TableCell>

                                        <TableCell align='right'>
                                            €{item.price}
                                        </TableCell>

                                       <TableCell align='right'>
                                       <Button 
                                       variant='contained'
                                        color='secondary'
                                        onClick={()=> removeItemHandler(item)}>
                                              x  
                                       </Button> 
                                       </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography variant='h2'>
                                    subtotal ({cartItems.reduce((a,c) => a + c.quantity, 0)} {" "} items
                                    )
                                    : € {""} {cartItems.reduce((a,c) => a + c.quantity * c.price, 0)}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Button 
                                variant='contained' 
                                onClick={checkOutHandler}
                                color='primary'
                                >Check Out</Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        )
        }
    </Layout>
  )
}


export default dynamic(()=> Promise.resolve(CartScreen), {ssr: false})