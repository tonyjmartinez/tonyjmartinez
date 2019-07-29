import React from 'react';
import Card from '../../ui/card/Card';
import Paragraph from '../../ui/paragraph/Paragraph';
import Title from '../../ui/title/Title';

const home = () => {
  const Header = () => (
    <div>
      <Title level={1}>Tony Martinez</Title>
      <Title level={3}>Full-Stack Engineer</Title>
    </div>
  );

  return (
    <>
      <Header />
      <Card title='About'>
        <Paragraph>
          I'm a full-stack engineer that loves building web apps with React. I
          have experience using React, GraphQL, ASP.NET Core, and MongoDB. I'm
          currently seeking a full-time development position in San Diego.
        </Paragraph>
      </Card>
    </>
  );
};

export default home;
