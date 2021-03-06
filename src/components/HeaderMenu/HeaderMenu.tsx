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
            case "/new-event":
                setSelectedKey("1");
                break;
            default:
                setSelectedKey("");
                break;
        }
    }, [location]);
    return (
        <Menu mode="horizontal" theme="dark" selectedKeys={[selectedKey]}>
            <Menu.Item key="1">
                <Link to="/new-event">Create an Event</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/about">About</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/updates">Updates</Link>
            </Menu.Item>
        </Menu>
    );
};

export default withRouter(HeaderMenu);
