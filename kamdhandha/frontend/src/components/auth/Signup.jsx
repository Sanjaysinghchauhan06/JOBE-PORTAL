import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import { setLoading } from '@/redux/authSlice'
import store from "@/redux/store";
import { Loader2 } from "lucide-react";


function Signup() {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading,user} = useSelector(store => store.auth);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();    //formdata object
      formData.append("fullname", input.fullname);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) {
          formData.append("file", input.file);
      }

      try {
        dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
              headers: { 'Content-Type': "multipart/form-data" },
              withCredentials: true,
          });
          if (res.data.success) {
              navigate("/login");
              toast.success(res.data.message);
          }
      } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
         
      }finally{
        dispatch(setLoading(false));
    }
  }

  useEffect(()=>{
    if(user){
        navigate("/");
    }
},[])
  return (
    <div>
      <Navbar />
      <div className="flex min-h-full flex-col justify-center  px-6 py-12 lg:px-8">
        <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-2xl  font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-5   bg-white shadow rounded rounded  justify-center ml-80 mr-80 ">
          <form  onSubmit={submitHandler} className="space-y-6 pr-20 pl-20 pt-5 ">
            <div>
              <label
               
                className="block text-sm font-medium leading-6  text-gray-900"
              >
                Full Name :
              </label>
              <div>
                <input
                 
                  type="text"
                  name="fullname"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
               
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                PhoneNumber :
              </label>
              <div >
                <input
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex gap-2 ">
              <label
               
                className="block text-sm font-medium leading-6  mt-2 text-gray-900"
              >
                Role :
              </label>
              <div className="flex gap-2">
                <div className="mt-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role==='student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <label>Student</label>
                </div>
                <div className="mt-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruciter"
                    checked={input.role==='recruciter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <label>Recruciter</label>
                 
                            <label className="ml-10">Profile :</label>
                            <input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer ml-2"
                            />
                       
                </div>
              </div>
            </div>
            <div>
              <label
              
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address :{" "}
              </label>
              <div>
                <input
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                 
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password :
                </label>
                <div className="text-sm">
                  
                    
                  
                   
                 
                </div>
              </div>
              <div>
                <div>
                <input
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {
                        loading ? <button className="flex mt-5 w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </button> :  <button
                        type="submit"
                        className="flex mt-5 w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    }
              <div className="mt-5">
               
              </div>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Aleady sign in ?
            <Link className="text-blue-500" to="/Login">log in</Link>
            </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
