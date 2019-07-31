import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import classes from './Screenshot.module.scss';
const { screenshotClass, screenshotDiv } = classes;

export interface Props {
  source: any;
}
const Screenshot = (props: Props) => {
  const [open, setOpen] = useState(false);
  const { source } = props;
  return (
    <div className={screenshotDiv}>
      <img
        className={screenshotClass}
        src={source}
        onClick={() => setOpen(true)}
      />

      {open && (
        <Lightbox mainSrc={source} onCloseRequest={() => setOpen(false)} />
      )}
    </div>
  );
};

export default Screenshot;
