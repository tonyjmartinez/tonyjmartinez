import React from "react";
import project23v23 from "./images/23vs23.png";
import projectBlogPlusMinus from "./images/blogplusminus.png";
import Title from "../../ui/title/Title";
import Project from "./Project";

const projects = () => {
  const bball = "\u{1F3C0}";
  const title23 = `23 vs 23 ${bball}`;
  const blog = "\u{1F4AC}";
  const titleBpm = `Blog Plus Minus ${blog}`;
  return (
    <>
      <Title level={1}>Projects</Title>
      <Title level={3}>Personal</Title>
      <Project
        title={title23}
        link="https://23vs23.com"
        repo="https://github.com/tonyjmartinez/23vs23"
        source={project23v23}
      >
        React/Redux NBA player stats comparator. Uses React-Vis to provide data
        visualization for player stats fetched from the MySportsFeeds API. Also
        utilizes Material-Ui components, React-Autocomplete, and React-Swipe.
      </Project>
      <Project
        title={titleBpm}
        link="https://blogplusminus.com"
        repo="https://github.com/tonyjmartinez/blogplusminus"
        source={projectBlogPlusMinus}
      >
        Blog built with ReactJs/GraphQL/Express/Mongo Db. Uses JWt/refresh token
        authentication and Material-UI components.
      </Project>
    </>
  );
};

export default projects;
