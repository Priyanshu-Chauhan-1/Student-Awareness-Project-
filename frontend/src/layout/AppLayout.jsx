import { Layout, Menu, Typography } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout
const { Title } = Typography

export default function AppLayout({ children }) {
  const location = useLocation()

  const selectedKey =
    location.pathname.startsWith('/students') ? 'students'
      : location.pathname.startsWith('/schemes') ? 'schemes'
      : 'dashboard'

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div style={{ height: 32, margin: 16, color: 'white', fontWeight: 600 }}>
          Portal
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={[
            { key: 'dashboard', label: <Link to="/">Dashboard</Link> },
            { key: 'students', label: <Link to="/students">Students</Link> },
            { key: 'schemes', label: <Link to="/schemes">Schemes</Link> },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: '#fff' }}>
          <Title level={4} style={{ margin: 0 }}>
            Student Awareness Portal
          </Title>
        </Header>

        <Content style={{ margin: 16 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}