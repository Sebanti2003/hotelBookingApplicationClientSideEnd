import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderButton from "@/components/LoaderButton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setlogin } from "@/store/slices/userslice.slice";

type FormData = {
  username: string;
  email: string;
  password: string;
};

function Signin() {
  const notify=()=>{
    toast.success("Login Successful",{
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    })
  }
    const [err,setErr]=React.useState("");
    const navigate=useNavigate();
  const dispatch = useDispatch();
  const user=useSelector(state=>state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: "moon@gmail.com",
      password: "1234567890",
      username: "moon1234",
    },
  });
  const onsubmit: SubmitHandler<FormData> = async function (data) {
    try {
      const formdata={...data}
      console.log(formdata);
      
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/v1/user/login`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(formdata)
        }
      )
      const dataa=await response.json();
      console.log(dataa);
      
      dispatch(setlogin({email:dataa.user.email,username:dataa.user.username,avatar:dataa.user.avatar,isauthenticated:true,accesstoken:dataa.accesstoken,refreshtoken:dataa.refreshtoken}));
      console.log(response);
      
      navigate("/");

    } catch (error) {
      console.log(error?.response?.data?.message);
      setErr(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <div className="md:w-[60%]  container flex justify-center  items-center">
        
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="container py-10 gap-2 bg-white rounded-lg flex flex-col"
        >
            <h1 className="text-3xl m-2">Sign In</h1>
            <p className="m-2 italic">Signin to your account</p>
          <Input
            placeholder="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              maxLength: 40,
              minLength: 0,
              validate: (value) => {
                if (value.includes("@")) return true;
                return "Invalid Email,It must contain @";
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <Input
            placeholder="username"
            type="username"
            {...register("username", {
              required: "username is required",
              maxLength: 40,
              minLength: 0
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
          <Input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must be at most 20 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          {isSubmitting ? (
            <LoaderButton />
          ) : (
            <Button onClick={notify} type="submit">Sign in</Button>
          )}
          <p>Don't have an account? <NavLink className={`text-blue-500 hover:text-blue-700 transition-all duration-500`} to={`/signup`}>Sign up</NavLink></p>
          {err && <p className="text-red-500">{err}</p>}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signin;
