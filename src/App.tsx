import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "./store/slices/userslice.slice";
function App() {
  // const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();  
  // useEffect(() => {
  //   const refreshtokengenerate = async () => {
  //     try {
  //       const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/v1/user/refresh`, {
  //         method: "POST",
  //         credentials: "include",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ refresh_token: user.refreshToken }),
  //       });
  
  //       const data = await response.json();
  //       if (data.status === "success") {
  //         return {refreshtoken:data.refreshToken,accesstoken:data.accesstoken}; // Assuming the response contains a new refresh token
  //       }
  //     } catch (error) {
  //       console.error("Error refreshing token:", error.message);
  //       // Handle error (e.g., redirect to login page)
  //     }
  //   };
  
  //   const checkTokenExpiration = async () => {
  //     const expirationTime = user?.accessToken?.exp * 1000; // Convert expiration time to milliseconds
  //     const currentTime = new Date().getTime();

  //     // Check if access token is expired or will expire soon (e.g., within 5 minutes)
  //     if (expirationTime && expirationTime - currentTime < 300000) {
  //       // Token needs refresh, call your refresh token function
  //       const {accesstoken,refreshtoken} = await refreshtokengenerate();

  //       // Update Redux state with new tokens
  //       dispatch(refreshAccessToken({accesstoken,refreshtoken})); // Assuming you have this action
  //     }
  //   };

  //   checkTokenExpiration();
  // }, [user,dispatch]);
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route index
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
            />
          </Route>

          <Route
            path="/signin"
            element={
              <Layout>
                <Signin />
              </Layout>
            }
          />
          <Route
            path="/signup"
            element={
              <Layout>
                <Signup />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
