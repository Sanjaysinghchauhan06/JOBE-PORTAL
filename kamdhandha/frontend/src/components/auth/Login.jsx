import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice"; 
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "../utils/constant";


function Login() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading ,user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally {
      dispatch(setLoading(false));
  }
  };
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
          <h2 className="mt- text-center text-2xl  font-bold leading-9 tracking-tight text-gray-900">
            Log In
          </h2>
        </div>
        <div className="mt-2   bg-white shadow rounded rounded  justify-center ml-80 mr-80 ">
          <form
            onSubmit={submitHandler}
            className="space-y-6 pr-20 pl-20 pt-5 "
          >
            <div className="flex gap-2 ">
              <label className="block text-sm font-medium leading-6  mt-2 text-gray-900">
                Role :
              </label>
              <div className="flex gap-2">
                <div className="mt-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
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
                    checked={input.role === "recruciter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <label>Recruciter</label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address :{" "}
              </label>
              <div>
                <input
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password :
                </label>
                <div className="text-sm"></div>
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
                        log in
                      </button>
                    }
              <div className="mt-5">
               
              </div>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            don't have an account ! /
            <Link to="/signUp" className="text-blue-500">signUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
