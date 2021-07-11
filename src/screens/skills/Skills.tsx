import React from 'react'
import Title from '../../ui/title/Title'
import Skill from './Skill'

const mySkills = [
  {
    title: 'React/Javascript Ecosystem',
    desc: 'ES5/6, React/Hooks, URQL GraphQL, TypeScript, React Testing Library',
  },
  {
    title: 'HTML/CSS',
    desc: 'CSS-in-JS, Chakra-UI, Responsive Design',
  },
  {
    title: 'Backend',
    desc: 'Asp.NET Core, GraphQL, Express',
  },
  {
    title: 'Database',
    desc: 'SQL/Entity Framework Core, MongoDB/Mongoose',
  },
]

const skills = () => {
  return (
    <>
      <Title level={1}>Skills</Title>
      {mySkills.map(({title, desc}, idx) => {
        return (
          <Skill key={title} title={title}>
            {desc}
          </Skill>
        )
      })}
    </>
  )
}

export default skills
