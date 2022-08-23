import { Card,
   CardActionArea,
    Grid, CardMedia,
     CardContent,
      Typography, 
      CardActions,
      Button
    } from '@material-ui/core'
import Link from 'next/link'
import Layout from '../components/Layout'
import Product from '../moduls/Product'
import data from'../utils/data'
import db from '../utils/db'





export default function Home() {
 
  
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {data.products.map((product)=>(
            <Grid item md={4} key={product.name}>
              <Card>
                <Link href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia component="img"
                   image={product.image}
                   title={product.name}>
                   </CardMedia>
                 <CardContent>
                  <Typography>
                    {product.name}
                  </Typography>
                  </CardContent> 
                </CardActionArea>
                </Link>
                  <CardActions>
                      <Typography>${product.price}</Typography>
                      <Button 
                      size='small'
                      color='primary'
                      >Add TO CART</Button> 
                  </CardActions>
              </Card>
              </Grid>
          )
          )}
        </Grid>
      </div>
    </Layout>
  )
}


export async function getServerSideProps(){
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()
  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}