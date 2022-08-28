import React from 'react'
import Title from '../../ui/title/Title'
import Skill from './Skill'

const mySkills = [
  {
    title: 'React/Javascript Ecosystem',
    desc: 'React, NextJs, Hasura GraphQL, TypeScript, React Testing Library, React Query',
  },
  {
    title: 'HTML/CSS',
    desc: 'CSS-in-JS, Chakra-UI, Responsive Design',
  },
  {
    title: 'Backend',
    desc: 'Hasura GraphQL, Express',
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
