import React, { Children } from "react";
import { Typography } from "antd";
import classes from "./Title.module.less";
import { string } from "prop-types";
const { Title } = Typography;
const { titleDiv } = classes;

export interface Props {
  level: 1 | 2 | 3 | 4 | undefined;
  children: React.ReactNode;
}

const title = (props: Props) => {
  const { level, children } = props;

  let lvl;
  if (level === 1) {
    lvl = "1em";
  } else if (level === 3) {
    lvl = "0em";
  }

  return (
    <div className={titleDiv}>
      <Title style={{ paddingTop: lvl }} level={level}>
        {children}
      </Title>
    </div>
  );
};

export default title;
