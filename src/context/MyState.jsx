import React, { useEffect, useState } from 'react'
import myContext from './Context'
import { QuerySnapshot, Timestamp, addDoc, collection, deleteDoc, doc,
   getDocs,
   onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { firedb } from '../FirebaseConfig';

function MyState(props) {
    const [mode, setMode] = useState('light');
    const [loading,setLoading]=useState(false);
    const[order,setOrder]=useState([]);
    const toggleMode = () => {
        if (mode === 'light') {  
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }

    const[products,setProducts]=useState({
      title:null,
      price:null,
      imageUrl:null,
      category:null,
      description:null,
      time:Timestamp.now(),
      date:new Date().toLocaleString(
        "en-US",
        {
          momth:"short",
          day:"2-digit",
          year:'numeric',
        }
      )
    })

    const addProduct=async()=>{
      if (products.title == null || products.price == null || products.imageUrl == null ||
         products.category == null || products.description == null) {
        return toast.error('Please fill all fields');
         }
         
      const productRef=collection(firedb,"products"); 
        setLoading(true);
        try {
          await addDoc(productRef,products)
          getProductData();
          setLoading(false);
          toast.success("add Data sucessfully")
      
          setTimeout(()=>{
            window.location.href="/dashboard";f
          },1000)
          // setProducts("")
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
        
      
    }

    const [product,setProduct]=useState([]);
    const getProductData=async()=>{
      setLoading(true);
      try {
        const q=query(collection(firedb,"products"),
        orderBy("time")
        );

        const data=onSnapshot(q,(QuerySnapshot)=>{
          let productArray=[];
          QuerySnapshot.forEach((doc)=>{
            productArray.push({...doc.data(),id:doc.id})
          })
          setProduct(productArray)
          setLoading(false);
        });
        return()=>data;
      } catch (error) {
        console.log(error.message);
        setLoading(false)
      }
    }
    
const editHandle=(item)=>{
    setProducts(item)
}

const getOrderData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(firedb, "order"))
    const ordersArray = [];
    result.forEach((doc) => {
      ordersArray.push(doc.data());
      setLoading(false)
    });
    setOrder(ordersArray);
    console.log(ordersArray)
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}




const updateProduct=async(item)=>{
  setLoading(true)
  try {
    const userRef= await setDoc(doc(firedb,"products",products.id),products);
    getProductData();
    setLoading(false);
    window.location.href="/dashboard"
  } catch (error) {
    console.log(error.message);
  }
  setProducts("");
  }

  const deleteProduct=async(item)=>{
      try {
        setLoading(true)
        await deleteDoc(doc(firedb,"products",item.id));
        toast.success("Product deleted")
        setLoading(false);
        getProductData();
      } catch (error) {
        console.log(error.message);
      }
  }

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(firedb, "user"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false)
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  useEffect(() => {
    getProductData();
    getOrderData()
    getUserData()
  
  }, []);

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')


  console.log(order)
  return (
    <myContext.Provider value={{toggleMode,mode,loading,setLoading,product,products,
    setProducts, addProduct,editHandle,updateProduct,deleteProduct,order,
    user,
      searchkey, setSearchkey,filterType, setFilterType,
      filterPrice, setFilterPrice}}>
       {props.children}
    </myContext.Provider>
  )
}

export default MyState