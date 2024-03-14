import React, {useState, useEffect} from 'react';
import {
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Typography, theme } from 'antd';
import './Sidebar.css';
import Dashboard from '../Home/Dashboard';
import TicketsSummary from '../TicketsSummary/TicketsSummary';
import logo from '../../assets/koajay_logo_new.jpeg'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Agents from '../Agent_Summary/Agents';
import Profile from '../Agent_Summary/Profile';
import StationHome from '../Station/StationHome';
import Rates from '../RatesAndCategories/Rates';

const { Header, Content, Footer, Sider } = Layout;

const Sidebar: React.FC = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const sidebarMenuItems = [
    {
      title: "Dashboard",
      key: "dashboard",
      icon: UserOutlined
     },
    {
      title: "Ticket Summary",
      key: "tickets-summary",
      icon: UserOutlined
    },
    {
      title: "Agent Summary",
      key: "agent-summary",
      icon: UserOutlined
    },
    {
      title: "Station Summary",
      key: "station-summary",
      icon: UserOutlined
    },
    {
      title: "Rates and Categories",
      key: "rates-and-categories",
      icon: UserOutlined
    },
    {
      title: "User Management",
      key: "user-management",
      icon: UserOutlined
    },
  ];
  
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
        ? "/dashboard"
        : location.pathname,
  );

  useEffect(() => {
    console.log(location.pathname)
      if (location) {
          if( current !== location.pathname ) {
              setCurrent(location.pathname);
          }
      }
  }, [location, current]);

  
  const onClick: MenuProps['onClick'] = (e) => {
    navigate('/' + e.key)
  };
  
  const items: MenuProps['items'] = sidebarMenuItems.map((sidebarItem) => ({
    key: sidebarItem.key,
    icon: React.createElement(sidebarItem.icon),
    label: sidebarItem.title,
  } ));

  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="demo-logo-vertical" >
          <img
            src={logo}
            style={{height: '10vh'}}
          />
        </div>
          <Menu theme="dark" mode="vertical" onClick={onClick}  defaultSelectedKeys={['1']} items={items} style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }} />
      </Sider>
      <Layout style={{ marginLeft: 220, width: '87vw', top: 0, height: '100vh' }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Typography.Title level={3} style={{padding:5}}> 
          {
            sidebarMenuItems.find(menuItem => '/'+menuItem.key === current)?.title || 'Dashboard'
          } 
          </Typography.Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tickets-summary" element={<TicketsSummary />} />
              <Route path="/agent-summary" element={<Agents />} />
              <Route path="/agent-summary/agents/:id" element={<Profile />} />
              <Route path="/station-summary" element={<StationHome />} />
              <Route path="/rates-and-categories" element={<Rates />} />
            </Routes>

          </div>
        </Content>
        <Footer >
          AL ©{new Date().getFullYear()} Created by Albert
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Sidebar;