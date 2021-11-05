import React, { FC, ReactNode, useState } from "react";
import TabsNav from "../TabsNav/TabsNav";

interface TabsProps {
  children: ReactNode[];
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div>
      {/* take array of labels to generate buttosn from ? */}
      <TabsNav labels={["labels1", "label"]}></TabsNav>
      <Tabs>{children}</Tabs>
    </div>
  );
};

export default Tabs;
