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
        React/Redux NBA player stats comparator. Uses React-Vis to provide data
        visualization for player stats fetched from the MySportsFeeds API. Also
        utilizes Material-Ui components, React-Autocomplete, and React-Swipe.
      </Project>
      <Project title={`The Hackboard`} link="https://thehackboard.com">
        Blog that supports MDX viewing and editing. MDX posts can be saved as
        local files or retrieved through an authenticated GraphQL server.
      </Project>
      <Project
        title={titleBpm}
        link="#"
        repo="https://github.com/tonyjmartinez/blogplusminus"
        source={projectBlogPlusMinus}
      >
        Blog built with ReactJs, GraphQL, Express, and MongoDB. Uses JWT/refresh
        token authentication and Material-UI components.
      </Project>
      <Project
        title={styleguidist}
        link="https://github.com/styleguidist/react-styleguidist"
      >
        Open source contributions to React-Styleguidist, a library that provides
        an environment to document, test, and develop React components.
      </Project>
    </>
  )
}

export default projects
