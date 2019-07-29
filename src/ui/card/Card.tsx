import React from 'react';
import classes from './Card.module.less';
import { Card } from 'antd';

const { cardClass, cardDiv } = classes;

const card = () => (
  <div className={cardDiv}>
    <Card className={cardClass} title="Default size card">
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </div>
);

export default card;
