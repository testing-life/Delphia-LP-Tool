import React, { FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import "./Tab.css";

const Tab: FC<ReactNode> = ({ children }) => {
  return <div>{children}</div>;
};

export default Tab;
