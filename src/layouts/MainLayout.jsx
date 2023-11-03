import React from "react";
import Header from "../components/Header/Header";
import Routers from "../routers/Routers";

const MainLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <Routers />
    </React.Fragment>
  );
};

export default MainLayout;
