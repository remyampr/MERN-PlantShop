import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import ProductListing from "./ProductListing";
import { filterByCategory,clearSearch } from "../Redux/productsSlice";


const CategoryPage = () => {

const dispatch=useDispatch();
const{category}=useParams();
const products=useSelector((state)=> state.products.products);
const filteredProducts=useSelector((state)=> state.products.filteredProducts);

useEffect(()=>{

    // console.log( "Category from URL:", category);  
    // console.log(" Product categories:", products.map(product => product.category));
    if(products.length >0 && category){
        dispatch(filterByCategory(category));
      
    }
},[category,products,dispatch]);



  return <ProductListing  products={filteredProducts} showCarousel={false} />
}

export default CategoryPage