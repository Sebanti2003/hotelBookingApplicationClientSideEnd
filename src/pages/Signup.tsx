import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import axios,{AxiosResponse} from "axios";
import { Button } from "@/components/ui/button";
import LoaderButton from "@/components/LoaderButton";
import { FaCameraRetro } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

type FormData = {
  username: string;
  email: string;
  password: string;
  avatar: File;
};
interface ApiResponse {
  data:{
    message:string
  }
}
function Signup() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState("");
  const [avatar, setAvatar] = useState<File>();
  const [err, setErr] = useState("");
  const onsubmit: SubmitHandler<FormData> = async function (data) {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", avatar as File);

      const response:AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/v1/user/register`,
        formData
      ) as AxiosResponse<ApiResponse>;
      if (response.status === 201) {
        navigate("/signin");
        return;
      }
    } catch (error) {
      setErr((error as any)?.response?.data?.message);
    }
  };
  const handlefileimagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    setAvatar(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64image = reader.result;
        setImageSrc(base64image as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: "test@gmail.com",
      password: "",
      username: "test",
    },
  });

  const reffile = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <div className="md:w-[60%] container flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onsubmit)}
          className="container py-10 gap-2 bg-white rounded-lg flex flex-col"
        >
          <h1 className="text-3xl m-2">Sign Up</h1>
          <p className="m-2 italic">Signup to your account</p>
          <div className="p-4 py-10 flex justify-center items-center ">
            <Input
              {...register("avatar")}
              ref={reffile}
              className="hidden"
              type="file"
              onChange={handlefileimagechange}
            />
            <div className="w-[200px] h-[200px] relative rounded-full border-2 border-black">
              <img
                className="w-full h-full object-cover rounded-full"
                src={imageSrc}
                alt=""
              />
              <FaCameraRetro
                className="absolute bottom-1 right-1 rounded-xl cursor-pointer bg-slate-300 p-1 w-8 h-8 "
                onClick={() => reffile.current?.click()}
                size={20}
              />
            </div>
          </div>
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
              minLength: 0,
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
            <Button type="submit">Register</Button>
          )}
          <p>
            Already have an account?{" "}
            <NavLink
              className={`text-blue-500 hover:text-blue-700 transition-all duration-500`}
              to={`/signin`}
            >
              Sign In{" "}
              <div className="text-white">{import.meta.env.VITE_TEST}</div>
            </NavLink>
            {err && <p className="text-red-500">{err}</p>}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
