import React, { FC, MouseEvent } from "react";
import Button from "../../Atoms/Button/Button";
import "./TabsNav.css";

interface TabsNavProps {
  labels: string[];
  onClick: (index: number, event: MouseEvent<HTMLButtonElement>) => void;
  activeTab: number;
}

const TabsNav: FC<TabsNavProps> = ({ labels, onClick, activeTab }) => {
  return (
    <ul className="tabsNav">
      {labels &&
        labels.map((label, index) => (
          <Button
            key={`${index}${label}`}
            variant={activeTab === index ? "primary" : "textOnly"}
            onClick={(event) => onClick(index, event)}
          >
            {label}
          </Button>
        ))}
    </ul>
  );
};

export default TabsNav;
