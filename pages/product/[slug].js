import { Button, Card, Grid, List, ListItem, Typography } from '@material-ui/core'
import Link from 'next/link'
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import useStyles from '../../utils/styles'
import Image from 'next/image'
import Product from '../../moduls/Product'
import db from '../../utils/db'
import { Store } from '../../utils/store'
import axios from 'axios'
import {useRouter} from 'next/dist/client/router'


export default function ProductScreen(props) {
    const router = useRouter()
    const { state, dispatch} = useContext(Store)
    const { product } = props
    const classes = useStyles()
    if(!product){
        return <div>Product not find</div>
    }

    const addToCartHandler = async() =>{
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/products/${product._id}`)
        if (data.countInStock < quantity) {
            window.alert("ausverkauft")
            return
        }
        dispatch({ type: 'CART-ADD-ITEM', payload: {...product, quantity}})
        router.push("/cart")
    }
    
  return (
    <div>
      <Layout title={product.name} description={product.description}>
        <div className={classes.section}>
            <Link href="/">
                <a>Back to Products</a>
            </Link>
        </div>
        <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
                <Image 
                src={product.image} 
                alt={product.name} 
                width={640} 
                height={640} 
                layout="responsive">
                </Image>
                </Grid>
                <Grid item md={3}xs={12}>
                    <List>
                        <ListItem>
                            <Typography component="h1" variant='h1'>{product.name}</Typography>
                        </ListItem>
                        <ListItem>category:{product.category}</ListItem>
                        <ListItem>Brand: {product.brand}</ListItem>
                        <ListItem>Rating: {product.rating} stars ({product.numReviews} reviews)</ListItem>
                        <ListItem>Description:{product.description}</ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                      <Typography>Price</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>${product.price}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                      <Typography>status</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>${product.countInStock>0 ? "in stock": "unavailable"}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>
                                    Add TO CART
                                </Button>
                            </ListItem>
                        </List>
                   </Card>     
                </Grid>
            </Grid>
      </Layout>
    </div>
  )
}


export async function getServerSideProps(context){
    const {params} = context
    const {slug} = params

    await db.connect()
    const product = await Product.findOne({slug}).lean()
    await db.disconnect()
    return {
      props: {
        product: db.convertDocToObj(product)
      }
    }
  }