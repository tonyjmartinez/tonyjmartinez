import React from "react";
import { SocialIcon } from "react-social-icons";
import classes from "./SocialIcon.module.scss";
const { social } = classes;

export interface Props {
  url: string;
}

const socialIcon = (props: Props) => {
  const { url } = props;
  return <SocialIcon className={social} url={url} />;
};

export default socialIcon;
