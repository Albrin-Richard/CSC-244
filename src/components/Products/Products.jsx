import React from 'react';
import Grid from '@material-ui/core/Grid';


import Product from './Product/Product';
import useStyles from './styles';


//const [result, setResult] = useState([]);
/*const products = [
    { id: 15, name: 'car 1', description: 'Running car', price: '5', image: 'https://ca-times.brightspotcdn.com/dims4/default/427f642/2147483647/strip/true/crop/2661x1317+0+0/resize/1200x594!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa3%2F01%2F196a389d4283b5b64d8493e0eb19%2Farteon-exterior-front-cropped.jpg'},
    { id: 20, name: 'car 2', description: 'Running car 2', price: '15', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/00_KIA_K8_3.jpg/440px-00_KIA_K8_3.jpg'},
    { id: 30, name: 'car 3', description: 'Running car 3', price: '50', image: 'https://content-images.carmax.com/qeontfmijmzv/MY19MKj0XutK084z874jt/9632621fd8464b5c0e54a9dee64ad4e5/tesla.jpg'},
    { id: 40, name: 'car 4', description: 'Running car 4', price: '75', image: 'https://carwow-uk-wp-3.imgix.net/Volvo-XC40-white-scaled.jpg'},
    { id: 50, name: 'car 5', description: 'Running car 5', price: '55', image: 'https://ca-times.brightspotcdn.com/dims4/default/427f642/2147483647/strip/true/crop/2661x1317+0+0/resize/1200x594!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa3%2F01%2F196a389d4283b5b64d8493e0eb19%2Farteon-exterior-front-cropped.jpg'},
    { id: 60, name: 'car 6', description: 'Running car 6', price: '65', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/00_KIA_K8_3.jpg/440px-00_KIA_K8_3.jpg'},
    { id: 70, name: 'car 7', description: 'Running car 7', price: '55', image: 'https://ca-times.brightspotcdn.com/dims4/default/427f642/2147483647/strip/true/crop/2661x1317+0+0/resize/1200x594!/format/webp/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fa3%2F01%2F196a389d4283b5b64d8493e0eb19%2Farteon-exterior-front-cropped.jpg'},
    { id: 8, name: 'car 8', description: 'Running car 8', price: '85', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/00_KIA_K8_3.jpg/440px-00_KIA_K8_3.jpg'},

];*/
//console.log(products);






const Products = ({products, onAddToCart}) => {
  const classes = useStyles();

  


  if (!products.length) return <p>Loading...</p>;
//console.log(products);
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
