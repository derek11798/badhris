import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { userIdAction } from "../../../../redux/actions";
import CustomAppBar from "../CustomAppBar/CustomAppBar";

const Protected = (props) => {
  console.log("protected");
  const [isLoggedIn, setIsLoggedIn] = React.useState();

  const localStorageChange = () => {
    console.log(
      "local storage change event listner called inside function block"
    );
    if (localStorage.getItem("accessToken") && localStorage.getItem("usrId")) {
      if (props.userId === "")
        console.log(
          "update redux with usrId :",
          JSON.stringify(localStorage.getItem("usrId"))
        );
      props.userIdAction(JSON.stringify(localStorage.getItem("usrId")));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  React.useEffect(() => {
    localStorageChange();
    console.log("add event listener");
    window.addEventListener("storage", () => localStorageChange(setIsLoggedIn));
  }, [props.userId]);

  if (props.auth) {
    if (isLoggedIn === true)
      return (
        <div>
          <CustomAppBar auth={isLoggedIn} />
          {props.children}
        </div>
      );
    else if (isLoggedIn === false) return <Navigate to={"/login"} replace />;
  } else if (!props.auth) {
    if (isLoggedIn === false)
      return (
        <div>
          <CustomAppBar auth={isLoggedIn} />
          {props.children}
        </div>
      );
    else if (isLoggedIn === true) return <Navigate to={"/"} replace />;
  }
};

const mapStateToProp = (state) => {
  return { userId: state.commonState.userId };
};
export default connect(mapStateToProp, { userIdAction })(Protected);
