import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import NewCalendar from "./components/NewCalendar";
import CounselingForm from "./components/CounselingForm";

const App = () => {
  return (
    <>
      <UserAuthContextProvider>
        <ProtectedRoute> <NavBar /> </ProtectedRoute>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/home/calendar" element={<ProtectedRoute><NewCalendar /></ProtectedRoute>} />
          <Route path="/home/counseling_form" element={<ProtectedRoute><CounselingForm /></ProtectedRoute>} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
};

export default App;
