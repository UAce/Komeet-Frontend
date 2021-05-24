import * as React from 'react';
import * as Icons from '@ant-design/icons';
import { Tooltip, TooltipProps } from 'antd';

interface HeaderWithIconProps {
    title: string;
    iconName: string;
    tooltipOptions: TooltipProps;
}

const HeaderWithIcon: React.FC<HeaderWithIconProps> = ({ title, iconName, tooltipOptions }) => {
    const Icon = Icons['QuestionCircleOutlined'];

    return (<div className="header-with-icon">
        <h1>Create an Event</h1>
        <Tooltip {...tooltipOptions}><Icon /></Tooltip>
    </div>);
}

export default HeaderWithIcon;