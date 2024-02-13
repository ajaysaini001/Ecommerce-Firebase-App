import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/Context'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonials from '../../components/testimonials/Testimonials'
import Footer from '../../components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'

function Home() {
  const add=useSelector(state=>state.cart)
  const dispatch=useDispatch()
  console.log(add);
    
  const addCart=()=>{
    const shirt=dispatch(addToCart("Main-Shirt"));
    // console.log(shirt);
  }

  const deleteCart=()=>{
    dispatch(deleteFromCart("Main-shirt"));
  }
  return (
    <Layout>
   
       <HeroSection/>
       <Filter/>
       <ProductCard/>
       <Track/>
       <Testimonials/>
       {/* <Footer/> */}
    </Layout>
  )
}

export default Home