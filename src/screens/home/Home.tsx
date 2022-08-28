import React from 'react'
import Card from '../../ui/card/Card'
import Paragraph from '../../ui/paragraph/Paragraph'
import Title from '../../ui/title/Title'
import SocialIcon from '../../ui/icons/SocialIcon'

const home = () => {
  const Header = () => (
    <div>
      <Title level={1}>Tony Martinez</Title>
      <Title level={3}>Full-Stack Engineer</Title>
    </div>
  )

  return (
    <>
      <Header />
      <Card title="About">
        <Paragraph>
          I'm a Senior Frontend Engineer with 6 years of experience that loves
          building web apps with React/NextJs, Typescript, and GraphQL. I'm
          currently seeking a full-time development position in the San Diego
          area.
        </Paragraph>
        <SocialIcon url="https://github.com/tonyjmartinez" />
        <SocialIcon url="https://linkedin.com/in/tonyjmartinez" />
        <SocialIcon url="mailto:ajosephmartinez@gmail.com" />
      </Card>
    </>
  )
}

export default home
