// auth app vs unauth app here

import React, { FC } from "react";
import AuthorisedApp from "../AuthorisedApp/AuthorisedApp.page";

const DashboardPage: FC = () => {
  return (
    <>
      <AuthorisedApp />
    </>
  );
};

export default DashboardPage;
