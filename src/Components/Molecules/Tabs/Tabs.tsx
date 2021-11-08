import React, { FC, ReactNode, useState } from "react";
import Tab from "../Tab/Tab";
import TabsNav from "../TabsNav/TabsNav";

interface TabsProps {
  children: ReactNode[];
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabCHangeHandler = (index: number, event: any) => {
    event.preventDefault();
    setActiveTab(index);
  };
  return (
    <div>
      <TabsNav
        onClick={tabCHangeHandler}
        labels={["labels1", "label"]}
      ></TabsNav>
      {children.map((child, index) => activeTab === index && child)}
    </div>
  );
};

export default Tabs;
