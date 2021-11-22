import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./AvatarLink.css";

export interface AvatarLinkProps {
  onClick?: () => void;
  path: string;
  imgSrc: string;
  alt?: string;
  size?: "default" | "large";
}

const AvatarLink: FC<AvatarLinkProps> = ({
  imgSrc,
  alt,
  onClick,
  path,
  size = "default",
}) => {
  return (
    <Link
      to={path}
      className={`avatarLink ${
        size === "default" ? "avatarLink--default" : "avatarLink--large"
      }`}
      onClick={onClick}
    >
      <img src={imgSrc} alt={alt} />
    </Link>
  );
};

export default AvatarLink;
