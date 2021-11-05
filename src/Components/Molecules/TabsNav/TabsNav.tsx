import React, { FC, ReactNode } from "react";

interface TabsNavProps {
  labels: string[];
}

const TabsNav: FC<TabsNavProps> = ({ labels }) => {
  return (
    <ul>
      {labels.map((label) => (
        <button>{label}</button>
      ))}
    </ul>
  );
};

export default TabsNav;
