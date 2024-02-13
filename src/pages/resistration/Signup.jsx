import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { auth, firedb } from '../../FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import myContext from '../../context/Context';
import Loader from '../../components/loader/Loader';

function Signup() {
   const[name,setName]=useState("");
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const context=useContext(myContext);
   const {loader,setLoader}=context;

   const signupUser=async()=>{ 
    setLoader(true)
    if( email==="" || passwoffrd===""){
        toast.error("All Filed are required");
    }
        try {
            const users=await createUserWithEmailAndPassword(auth,email,password);
            var user={
                name:name,
                email: users.user.email,
                uid:users.user.uid,
                time:Timestamp.now(),
            }

            const userRef=collection(firedb,"users");
             await addDoc(userRef,user);
             toast.success("signup sucessfully");
             setName("")
             setEmail("")
             setPassword("")
             setLoader(false);
             console.log("sucess")
        } catch (error) {
            console.log(error.message);
        }
    
   }
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loader && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='name'
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div>
                    <input type="email"
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button onClick={()=>signupUser()}
                        className=' bg-red-500 w-full hover:bg-orange-500 text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup