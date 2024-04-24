import Layout from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route
              index
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
