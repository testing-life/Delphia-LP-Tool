import React, { FC, ReactNode } from "react";
import "./Tab.css";

const Tab: FC<ReactNode> = ({ children }) => {
  return <section>{children}</section>;
};

export default Tab;
