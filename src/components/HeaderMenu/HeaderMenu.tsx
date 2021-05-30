import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

interface HeaderMenuProps extends RouteComponentProps {}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ location }) => {
    const [selectedKey, setSelectedKey] = useState<string>("");

    useEffect(() => {
        const currentPath = location.pathname;
        switch (currentPath) {
            case "/about":
                setSelectedKey("2");
                break;
            case "/updates":
                setSelectedKey("3");
                break;
            case "/":
            default:
                setSelectedKey("1");
                break;
        }
    }, [location]);
    return (
        <Menu mode="horizontal" theme="dark" selectedKeys={[selectedKey]}>
            <Menu.Item key="1">
                <Link to="/">Create an Event</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/updates">Updates</Link>
            </Menu.Item>
        </Menu>
        // <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        //     <Menu.Item key="1">nav 1</Menu.Item>
        //     <Menu.Item key="2">nav 2</Menu.Item>
        //     <Menu.Item key="3">nav 3</Menu.Item>
        // </Menu>
    );
};

export default withRouter(HeaderMenu);
