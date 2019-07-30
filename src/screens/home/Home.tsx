import React from "react";
import Card from "../../ui/card/Card";
import Paragraph from "../../ui/paragraph/Paragraph";
import Title from "../../ui/title/Title";
import SocialIcon from "../../ui/icons/SocialIcon";
import { Link } from "react-router-dom";

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
      <Card title="About">
        <Paragraph>
          I'm a full-stack engineer that loves building web apps with React. I
          have experience using React, GraphQL, Asp.NET Core, and MongoDB. I'm
          currently seeking a full-time development position in San Diego.
        </Paragraph>
        <Paragraph>
          I have 3 years of experience working with React, Asp.NET Core/EF
          framework, and Android. My current current role involves making
          internal web and Android applications.
        </Paragraph>
        <SocialIcon url="https://github.com/tonyjmartinez" />
        <SocialIcon url="https://linkedin.com/in/tonyjmartinez" />
        <SocialIcon url="mailto:ajosephmartinez@gmail.com" />
      </Card>
    </>
  );
};

export default home;
