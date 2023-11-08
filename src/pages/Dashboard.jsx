import React from "react";
import Helmet from "../components/Helmet/helmet";
import Table from "../components/UI/Table";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Helmet title="Dashboard">
        <Table />
      </Helmet>
    </React.Fragment>
  );
};

export default Dashboard;
