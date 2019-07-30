import React from "react";
import Title from "../../ui/title/Title";
import Skill from "./Skill";

const mySkills = [
  {
    title: "JavaScript",
    desc: "ES5/6, React/Hooks, Redux, TypeScript, JSX, Jest"
  },
  {
    title: "HTML/CSS",
    desc: "CSS-in-JS, SASS, Responsive Design"
  },
  {
    title: "C#",
    desc: "Asp.NET Core"
  },
  {
    title: "SQL, MongoDB",
    desc: "Entity Framework Core, Mongoose"
  }
];

const skills = () => {
  return (
    <>
      <Title level={1}>Skills</Title>
      {mySkills.map(({ title, desc }, idx) => {
        return (
          <Skill key={title} title={title}>
            {desc}
          </Skill>
        );
      })}
    </>
  );
};

export default skills;
