import React, {useState} from 'react'
import classes from './Screenshot.module.scss'
const {screenshotClass, screenshotDiv} = classes

export interface Props {
  source: any
}
const Screenshot = (props: Props) => {
  const {source} = props
  return (
    <div className={screenshotDiv}>
      <img alt="screenshot" className={screenshotClass} src={source} />
    </div>
  )
}

export default Screenshot
