import React from "react";
import { Typography } from "antd";
const { Paragraph } = Typography;

export interface Props {
  children: React.ReactNode;
}
const paragraph = (props: Props) => {
  const { children } = props;

  return <Paragraph>{children}</Paragraph>;
};

export default paragraph;
