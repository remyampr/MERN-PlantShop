import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { setProducts } from "../Redux/productsSlice";
import ProductListing from "./ProductListing";

const Home = () => {

const dispatch=useDispatch();
const filteredProducts = useSelector((state) => state.products.filteredProducts);



useEffect(()=>{
  fetch('/data/plantData.json')
  .then((response)=>{
    if(!response){
      throw new Error("Failed to fetch Produtcs from json file");
    }
    return response.json();
  })
  .then((produtsData)=>{
    // console.log('Fetched Products:', produtsData);
    dispatch(setProducts(produtsData));
  })
  .catch((error)=>{
    console.error(error);
  })
},[dispatch]);



return <ProductListing products={filteredProducts} showCarousel={true} />;
}

export default Home