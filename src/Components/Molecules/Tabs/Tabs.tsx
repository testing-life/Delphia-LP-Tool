import React, { FC, ReactNode, useState, MouseEvent } from "react";
import TabsNav from "../TabsNav/TabsNav";
import "./Tabs.css";

export interface TabsProps {
  children: ReactNode[];
  labels: string[];
}

const Tabs: FC<TabsProps> = ({ children, labels }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabCHangeHandler = (
    index: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setActiveTab(index);
  };
  return (
    <div className="tabs">
      <TabsNav
        onClick={tabCHangeHandler}
        labels={labels}
        activeTab={activeTab}
      ></TabsNav>
      {children && children.map((child, index) => activeTab === index && child)}
    </div>
  );
};

export default Tabs;
