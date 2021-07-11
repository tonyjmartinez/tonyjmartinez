import React from 'react'
import {Typography} from 'antd'
const {Title} = Typography

export interface Props {
  level: 1 | 2 | 3 | 4 | undefined
  children: React.ReactNode
}

const title = (props: Props) => {
  const {level, children} = props

  let lvl
  if (level === 1) {
    lvl = '1em'
  } else if (level === 3) {
    lvl = '0em'
  }

  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        marginBottom: '0em',
      }}
    >
      <Title style={{paddingTop: lvl}} level={level}>
        {children}
      </Title>
    </div>
  )
}

export default title
