import React from "react";
import classes from "./Card.module.scss";
import { Card } from "antd";
const { cardClass, cardDiv } = classes;

export interface Props {
  title: string;
  children: React.ReactNode;
  link?: string;
  repo?: string;
}

const card = (props: Props) => {
  const { title, link, repo, children } = props;
  const web = "\u{1F310}";
  const git = "\u{1F5A5}";

  const more = (
    <div>
      {link ? <a href={link}>Link {web}</a> : null}
      {repo ? (
        <a style={{ marginLeft: "2em" }} href={repo}>
          Github Repo {git}
        </a>
      ) : null}
    </div>
  );

  return (
    <div className={cardDiv}>
      <Card className={cardClass} title={title} extra={more}>
        {children}
      </Card>
    </div>
  );
};

export default card;
