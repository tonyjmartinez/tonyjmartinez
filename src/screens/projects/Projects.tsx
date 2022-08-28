import React from 'react'
import project23v23 from './images/23vs23.png'
import projectBlogPlusMinus from './images/blogplusminus.png'
import Title from '../../ui/title/Title'
import Project from './Project'

const projects = () => {
  const bball = '\u{1F3C0}'
  const title23 = `23 vs 23 ${bball}`
  const blog = '\u{1F4AC}'
  const titleBpm = `Blog Plus Minus ${blog}`
  const octopus = '\u{1F419}'
  const styleguidist = `React-Styleguidist ${octopus}`
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
        React NBA player stats comparator. React-Vis is used for visualizing
        player stats fetched from the MySportsFeeds API. Material-Ui components,
        React-Autocomplete, and React-Swipe are used for the UI/UX.
      </Project>
    </>
  )
}

export default projects
