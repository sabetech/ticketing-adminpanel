import React, {useState, useEffect} from 'react';
import {
  DashboardOutlined,
  DollarOutlined,
  FileDoneOutlined,
  ThunderboltOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  PushpinOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, Typography, theme, Dropdown, Space, Modal, Avatar } from 'antd';
import './Sidebar.css';
import Dashboard from '../Home/Dashboard';
import TicketsSummary from '../TicketsSummary/TicketsSummary';
import logo from '../../assets/koajay_logo_new.jpeg'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Agents from '../Agent_Summary/Agents';
import Profile from '../Agent_Summary/Profile';
import TaskForce from '../Taskforce/TaskForce';
import Rates from '../RatesAndCategories/Rates';
import ThirdPartyCustomers from "../OnCreditCustomers/ThirdPartyCustomers";
import StationTicketSummary from "../Station/StationTicketSummary";
import { TAuthUserResponse } from '../../Types/Auth';
const { Header, Content, Sider } = Layout;
import { logout } from '../../Services/Auth';
import * as utils from "../../Utils/Auth";
import { getUserInfo } from '../../Utils/Auth';
import ManageUsers from '../UserManagement/ManageUsers';

type SidebarProps = {
  userInfo: TAuthUserResponse
}

export const UserContext = React.createContext<TAuthUserResponse | null>(null)

const Sidebar: React.FC<SidebarProps> = ( { userInfo } ) => {
  const [open, setOpen] = useState<boolean>(false);
  const [confirmLoading, setConfirmingLoading] = useState<boolean>(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const showConfirmLogout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setOpen(true)
  }

  const handleLogout = async () => {
    setConfirmingLoading(true)

    const userInfo = getUserInfo()
    console.log(userInfo);
    if (!userInfo) window.location.reload();

    await logout();
    setConfirmingLoading(false)
    utils.signOut();
  };
  const handleCancel = () => setOpen(false);

  const UserDropdown: MenuProps['items'] = [
    {
      type: 'divider',
    },
    {
      label: (
        <a onClick={showConfirmLogout}>
          Logout
        </a>
      ),
      key: 'logout',
      
    },
  ];

  const sidebarMenuItems = [
    {
      title: "Dashboard",
      key: "dashboard",
      icon: DashboardOutlined
     },
    {
      title: "Ticket Summary",
      key: "tickets-summary",
      icon: FileDoneOutlined
    },
    {
      title: "Agent Summary",
      key: "agent-summary",
      icon: UsergroupAddOutlined
    },
    {
      title: "Task Force",
      key: "task-force",
      icon: ExclamationCircleOutlined
    },
    {
      title: "Station Summary",
      key: "station-summary",
      icon: PushpinOutlined
    },
    {
      title: "Rates and Categories",
      key: "rates-and-categories",
      icon: DollarOutlined
    },
    {
      title: "Third Party(On Credit) ",
      key: "on-credit-customers",
      icon: ThunderboltOutlined
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

  const handleManageUsers = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/users/manage");
  }

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
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <Typography.Title level={3} style={{padding:5}}> 
            {
              sidebarMenuItems.find(menuItem => '/'+menuItem.key === current)?.title || 'Dashboard'
            } 
            </Typography.Title>
          </Space>
          <Space style={{marginRight: '2em'}}>
            <Dropdown menu={ {items: [{
                                label: (
                                  <a onClick={handleManageUsers}>
                                    Manage Users
                                  </a>
                                ),
                                key: 'manage_users',
                              }, ...UserDropdown,]} }>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
              <h3>{ userInfo.user.fname }({userInfo.user.email})</h3>
              <Avatar size={"large"} icon={<UserOutlined />} />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Space>
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
            <UserContext.Provider value={userInfo}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tickets-summary" element={<TicketsSummary />} />
                <Route path="/agent-summary" element={<Agents />} />
                <Route path="/agent-summary/:id/detail" element={<Profile />} />
                <Route path="/task-force" element={<TaskForce />} />
                <Route path="/station-summary" element={<StationTicketSummary />} />
                <Route path="/rates-and-categories" element={<Rates />} />
                <Route path="/on-credit-customers" element={<ThirdPartyCustomers />} />
                <Route path="/user-management" element={<ManageUsers />} />
                <Route path="/users/manage" element={<ManageUsers />} />
              </Routes>
            </UserContext.Provider>
          </div>
        </Content>
      </Layout>
      <Modal
        title="Title"
        open={open}
        onOk={handleLogout}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Logout!"}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </Layout>
  );
};

export default Sidebar;