import React, { FC, ReactNode, MouseEvent } from "react";

interface TabsNavProps {
  labels: string[];
  onClick: (index: number, event: MouseEvent<HTMLButtonElement>) => void;
}

const TabsNav: FC<TabsNavProps> = ({ labels, onClick }) => {
  return (
    <ul>
      {labels &&
        labels.map((label, index) => (
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
