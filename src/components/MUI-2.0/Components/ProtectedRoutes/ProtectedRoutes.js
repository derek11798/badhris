import React, { useEffect } from "react";
import store from "../../../../redux/store/store";
import Home from "../UI/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomAppBar from "../CustomAppBar/CustomAppBar";
import CreateSelfLg from "../Screens/CreateSelfLg";
const ProtectedRoutes = () => {
  console.log("Protected Routes");
  useEffect(() => {
    const { commonState } = store.getState();
    console.log("store.getState() :", store.getState({}), commonState.userId);
  }, []);
  return (
    <div>
      {/* <CustomAppBar /> */}
      <Routes>
        <Route exact path="/*" element={<Home />} />
        <Route exact path="/self/*" element={<CreateSelfLg mode={"self"} />} />
        <Route exact path="/edit/*" element={<CreateSelfLg />} />
      </Routes>
    </div>
  );
};
export default ProtectedRoutes;
