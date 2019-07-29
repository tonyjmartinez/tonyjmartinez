import React from 'react';
import classes from './Screenshot.module.less';
const { screenshotClass, screenshotDiv } = classes;

export interface Props {
  source: any;
}
const screenshot = (props: Props) => {
  const { source } = props;
  return (
    <div className={screenshotDiv}>
      <img className={screenshotClass} src={source} />
    </div>
  );
};

export default screenshot;
