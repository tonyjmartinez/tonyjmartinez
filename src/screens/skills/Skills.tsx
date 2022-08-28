import React from 'react'
import Title from '../../ui/title/Title'
import Skill from './Skill'

const mySkills = [
  {
    title: 'React/Javascript Frontend Stack',
    desc: 'React/NextJs, TypeScript',
  },
  {
    title: 'Frontend Libraries',
    desc: 'Chakra-UI, React Testing Library, React Query',
  },
  {
    title: 'Backend',
    desc: 'Hasura GraphQL, Express, ASP.Net Core',
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
