import React, { FC, ReactNode, useState, MouseEvent } from "react";
import Tab from "../Tab/Tab";
import TabsNav from "../TabsNav/TabsNav";

interface TabsProps {
  children: ReactNode[];
  labels: string[]
}

const Tabs: FC<TabsProps> = ({ children , labels}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabCHangeHandler = (
    index: number,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setActiveTab(index);
  };
  return (
    <>
      <TabsNav
        onClick={tabCHangeHandler}
        labels={labels}
      ></TabsNav>
      {children && children.map((child, index) => activeTab === index && child)}
    </>
  );
};

export default Tabs;
