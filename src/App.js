import React from 'react';
import moment from 'moment';
import '../node_modules/antd/dist/antd.css'
import { Layout, Menu, Input, Button, Switch } from 'antd';
import {
  HistoryOutlined
} from '@ant-design/icons';

const { Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component {
  state = {
    theme: 'dark',
    collapsed: false,
    url: '',
    result: [],
    history: [],
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  sendRequest = () => {
    fetch(this.state.url)
      .then(response => response.json())
      .then(result => this.setState({
        result,
      }))
      let history = [...this.state.history]
      history.push(this.state.url)
      this.setState ({
        history,
      })
  }

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} theme={this.state.theme}>
          <div className="logo" />
          <Menu theme={this.state.theme} mode="inline">
            <Menu.Item key="9" icon={<HistoryOutlined />}>
              История
            </Menu.Item>
            {this.state.history.map((item, index) => {
              return <p key={index}>{item}</p>
            })}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div style={{display: 'flex'}}>
                <Input onChange={(e) => this.setState({
                  url: e.target.value,
                })}/>
                <Button type='primary' onClick={this.sendRequest}>send</Button>
              </div>
            <div>
              <p>результат</p>{JSON.stringify(this.state.result)}
            </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>©{moment().format('YYYY')}</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
