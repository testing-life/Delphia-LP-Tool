import React, { FC, ReactNode } from "react";

interface TabsNavProps {
  labels: string[];
  onClick: (index: number, event: any) => void;
}

const TabsNav: FC<TabsNavProps> = ({ labels, onClick }) => {
  return (
    <ul>
      {labels.map((label, index) => (
        <button
          key={`${index}${label}`}
          onClick={(event) => onClick(index, event)}
        >
          {label}
        </button>
      ))}
    </ul>
  );
};

export default TabsNav;
