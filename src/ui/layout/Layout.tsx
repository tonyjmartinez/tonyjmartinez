import React from 'react'
import {Layout, Menu} from 'antd'
import {Link, useLocation} from 'react-router-dom'
import classes from './Layout.module.scss'

const {Header, Content, Footer} = Layout

const {footer, menu, content, contentDiv} = classes

// TODO: Create correct interface for props when
// using withRouter
export interface Props {
  children?: React.ReactNode
  location: string
}

const LayoutContainer = (props: any) => {
  const {children} = props
  const {pathname} = useLocation()

  let selected: string = '1'

  switch (pathname) {
    case '/':
      selected = '1'
      break
    case '/projects':
      selected = '2'
      break
    case '/skills':
      selected = '3'
      break
  }

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[selected]}
          className={menu}
        >
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/projects">Projects</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/skills">Skills</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className={content}>
        <div className={contentDiv}>{children}</div>
      </Content>
      <Footer className={footer} />
    </Layout>
  )
}

export default LayoutContainer
