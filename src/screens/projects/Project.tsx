import React from 'react';
import Card from '../../ui/card/Card';
import Paragraph from '../../ui/paragraph/Paragraph';
import Screenshot from '../../ui/screenshot/Screenshot';

export interface Props {
  title: string;
  link: string;
  repo?: string;
  children: React.ReactNode;
  source: string;
}

const project = (props: Props) => {
  const { title, link, repo, children, source } = props;
  return (
    <Card title={title} link={link} repo={repo}>
      <Paragraph>{children}</Paragraph>
      <Screenshot source={source} />
    </Card>
  );
};

export default project;
