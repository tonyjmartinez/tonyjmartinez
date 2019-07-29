import React from 'react';
import Card from '../../ui/card/Card';
import classes from './Header.module.less';
import { Typography } from 'antd';
const { Title } = Typography;
const { header } = classes;

const home = () => {
  const Header = () => (
    <div className={header}>
      <Title>Tony Martinez</Title>
      <Title level={3}>Full-Stack Engineer</Title>
    </div>
  );

  return (
    <>
      <Header />
      <Card />
    </>
  );
};

export default home;
