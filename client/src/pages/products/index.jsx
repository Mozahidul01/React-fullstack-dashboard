import { Box, Grid } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useGetProductsQuery } from "../../features/products/productsApi";
import Error from "../../components/utils/Error";
import Product from "../../components/Product";
import ProductsSkeleton from "../../components/skeletons/ProductsSkeleton";

export default function Products() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  //Decide what to display
  let content = null;

  if (isLoading) {
    content = <ProductsSkeleton />;
  } else if (isError) {
    content = <Error message="Oops! An Error Occure" />;
  } else if (products.length > 0) {
    content = (
      <Grid
        container
        spacing={{ md: 3, lg: 4 }}
        rowSpacing={2}
        columnSpacing={2}
      >
        {products.map((product) => (
          <Product
            key={product._id}
            _id={product._id}
            name={product.name}
            price={product.price}
            category={product.category}
            rating={product.rating}
            description={product.description}
            supply={product.supply}
            stat={product.stat}
          />
        ))}
      </Grid>
    );
  }

  return (
    <Box m="0.5em 1em">
      <PageHeader
        title="Products"
        subtitle="See your list of products"
      />
      {content}
    </Box>
  );
}
