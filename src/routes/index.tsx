import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import ListStudents from "../pages/Students";
import Activities from "../pages/Activities";
import Tasks from "../pages/Activities/Tasks";

const RoutesMain = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<Navigate to={"/"} />} />
      <Route path="/students" element={<ListStudents />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
};

export default RoutesMain;
