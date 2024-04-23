import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoaderButton from "@/components/LoaderButton";
import { LeafyGreen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { setlogin } from "@/store/slices/userslice.slice";

type FormData = {
  username: string;
  email: string;
  password: string;
};

function Signin() {
    const [err,setErr]=React.useState("");
    const navigate=useNavigate();
  const dispatch = useDispatch();
  const user=useSelector(state=>state.user);
  const {
    register,
    handleSubmit,
    setError,
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
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/v1/user/login`,
        formdata
      )
      dispatch(setlogin({email:response.data.user.email,username:response.data.user.username,avatar:response.data.user.avatar,isauthenticated:true,accesstoken:response.data.accesstoken,refreshtoken:response.data.refreshtoken}));
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
            <Button type="submit">Sign in</Button>
          )}
          <p>Don't have an account? <NavLink className={`text-blue-500 hover:text-blue-700 transition-all duration-500`} to={`/signup`}>Sign up</NavLink></p>
          {err && <p className="text-red-500">{err}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signin;
