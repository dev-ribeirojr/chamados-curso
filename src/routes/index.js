import { Routes, Route } from "react-router-dom";

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Private from "./Private";

import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import New from "../pages/New";

export default function RoutesApp() {

  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      <Route path="/new" element={<Private> <New /> </Private>} />
      <Route path="/profile" element={<Private> <Profile /> </Private>} />
      <Route path="/customers" element={<Private> <Customers /> </Private>} />
      <Route path="/dashboard" element={<Private> <Dashboard /> </Private>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}