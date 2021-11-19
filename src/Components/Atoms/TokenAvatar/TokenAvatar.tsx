import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./TokenAvatar.css";

export interface TokenAvatarProps {
  imgSrc: string;
  caption: string;
}

const TokenAvatar: FC<TokenAvatarProps> = ({ imgSrc, caption }) => {
  return (
    <figure className="tokenAvatar">
      <img className="tokenAvatar__image" src={imgSrc} />
      <figcaption className="tokenAvatar__caption">{caption}</figcaption>
    </figure>
  );
};

export default TokenAvatar;
