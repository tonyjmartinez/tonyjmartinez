import React from 'react';
import { Layout, Menu } from 'antd';
import classes from './Layout.module.less';

const { Header, Content, Footer } = Layout;

const { footer, menu, content, contentDiv } = classes;

interface Props {
  children: React.ReactNode;
}

const layout = (props: Props) => (
  <Layout className="layout">
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        className={menu}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content className={content}>
      <div className={contentDiv}>{props.children}</div>
    </Content>
    <Footer className={footer} />
  </Layout>
);

export default layout;
