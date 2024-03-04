import React from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import './Sidebar.css';

const { Header, Content, Footer, Sider } = Layout;

const sidebarMenuItems = [
  {
    title: "Dashboard", 
    icon: UserOutlined
   },
  {
    title: "Ticket Summary",
    icon: UserOutlined
  },
  {
    title: "Agent Summary",
    icon: UserOutlined
  },
  {
    title: "Station Summary",
    icon: UserOutlined
  },
  {
    title: "Rates and Categories",
    icon: UserOutlined
  },
  {
    title: "User Management",
    icon: UserOutlined
  },

]

const items: MenuProps['items'] = sidebarMenuItems.map((sidebarItem, index) => ({
  key: String(index + 1),
  icon: React.createElement(sidebarItem.icon),
  label: sidebarItem.title,
}));

const Sidebar: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" >
          <img
            src="https://placehold.co/200/png"
          />
        </div>
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']} items={items} />
      </Sider>
      <Layout style={{ marginLeft: 300 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} title='KOJAY' />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {/* <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Some content here ...
          </div> */}
        </Content>
        <Footer >
          AL ©{new Date().getFullYear()} Created by Albert
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;