import React from "react";
import Card from "../../ui/card/Card";
import Paragraph from "../../ui/paragraph/Paragraph";

export interface Props {
  title: string;
  children: React.ReactNode;
}

const skill = (props: Props) => {
  const { title, children } = props;
  return (
    <Card title={title}>
      <Paragraph>{children}</Paragraph>
    </Card>
  );
};

export default skill;
