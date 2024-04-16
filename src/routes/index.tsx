import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import ListStudents from "../pages/Students";

const RoutesMain = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={<Navigate to={"/"} />} />
      <Route path="/students" element={<ListStudents />} />
    </Routes>
  );
};

export default RoutesMain;
