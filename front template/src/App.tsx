import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateUserPage from "./components/PrivateUserPage/PrivateUserPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<>Home page Component</>} />
      <Route path="/dashboard" element={<PrivateUserPage children={<></>} />} />
    </Routes>
  );
};

export default App;
