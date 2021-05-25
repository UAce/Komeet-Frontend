import React from 'react';
import 'antd/dist/antd.css'
import AppLayout from '../AppLayout/AppLayout';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Modal } from 'antd';

interface NotFoundProps extends RouteComponentProps { }
const NotFound: React.FC<NotFoundProps> = ({ history }) => {
    return (
        <AppLayout>
            <Modal
                title="Page Not Found"
                centered
                visible={true}
                closable={false}
                onOk={() => {
                    history.push('/');
                }}
                okText="Create an Event"
                width={600}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                Oops, looks like the event you're looking for does not exist.
            </Modal>
        </AppLayout>
    );
};

export default withRouter(NotFound);
