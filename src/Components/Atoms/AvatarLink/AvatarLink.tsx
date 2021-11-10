import React, { FC } from "react";
import "./AvatarLink.css";

export interface AvatarLinkProps {
  onClick: () => void;
  imgSrc: string;
  alt?: string;
  size?: "default" | "large";
}

const AvatarLink: FC<AvatarLinkProps> = ({
  imgSrc,
  alt,
  onClick,
  size = "default",
}) => {
  return (
    <a className={`avatarLink avatarLink--${size}`} onClick={onClick}>
      <img src={imgSrc} alt={alt} />
    </a>
  );
};

export default AvatarLink;
