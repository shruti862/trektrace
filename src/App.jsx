import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import City from "./components/City";
import Form from "./components/Form";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { CitiesProvider } from "./Context/CitiesContext";

import SpinnerFullPage from "./components/SpinnerFullPage";
import Memories from "./pages/Memories";
const Homepage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="album" element={<Memories />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            success: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#fff",
              color: "#374151",
              marginBottom: "3px",
            },
          }}
        />
      </BrowserRouter>
    </CitiesProvider>
  );
}

export default App;
