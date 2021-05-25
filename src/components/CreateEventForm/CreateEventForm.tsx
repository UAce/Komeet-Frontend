import React, { useState } from 'react';
import { Tooltip, Form, Radio, Input, Button, Checkbox, Divider } from 'antd';
import InfiniteCalendar, {
    Calendar,
    withMultipleDates,
} from 'react-infinite-calendar';
import format from 'date-fns/format';
import 'react-infinite-calendar/styles.css'; // Make sure to import the default stylesheet
import 'antd/dist/antd.css'

import { QuestionCircleOutlined } from '@ant-design/icons';
import './CreateEventForm.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

type CalendarType = 'dates' | 'days';

interface EventForm {
    eventName: string;
    eventDescription: string;
    calendarType: CalendarType;
}

interface CreateEventFormProps { }
const CheckboxGroup = Checkbox.Group;
const MultipleDatesCalendar = withMultipleDates(Calendar);

const CreateEventForm: React.FC<CreateEventFormProps> = () => {
    const plainOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const defaultCheckedList: CheckboxValueType[] = [];
    const [form] = Form.useForm();
    const [calendarType, setCalendarType] = useState<CalendarType>('dates');
    const today = new Date();
    const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const onFormChange = (eventFormData: EventForm) => {
        setCalendarType(eventFormData.calendarType);
    };
    const defaultMultipleDateInterpolation = (date: Date, selected: Date[]) => {
        const selectedMap = selected.map(function (date) {
            return format(date, 'yyyy-MM-dd');
        });
        const index = selectedMap.indexOf(format(date, 'yyyy-MM-dd'));
        return index === -1 ? ([] as Date[]).concat(selected, [date]) : ([] as Date[]).concat(selected.slice(0, index), selected.slice(index + 1));
    };



    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    return (
        <div>
            <div className="header-with-icon">
                <h1>Create an Event</h1>
                <Tooltip placement="top" title='Create an event, what else?'><QuestionCircleOutlined /></Tooltip>
            </div>
            <Divider />
            <Form
                form={form}
                layout="vertical"
                initialValues={{ calendarType }}
                onValuesChange={onFormChange}
            >
                <Form.Item label="Event Name" name="eventName" required>
                    <Input placeholder="e.g. March Book Club" />
                </Form.Item>
                <Form.Item label="Event Description" name="eventDescription">
                    <Input placeholder="e.g. March Book Club will be at Lafontaine Park " />
                </Form.Item>

                <Form.Item name="calendarType">
                    <Radio.Group buttonStyle="solid" value={calendarType}>
                        <Radio.Button value='dates'>SPECIFIC DATES</Radio.Button>
                        <Radio.Button value='days'>DAYS OF WEEK</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {
                    calendarType === 'dates' ? <InfiniteCalendar
                        Component={MultipleDatesCalendar}
                        interpolateSelection={defaultMultipleDateInterpolation}
                        width={350}
                        height={400}
                        selected={[today]}
                        minDate={thisWeek}
                    /> : <div>
                        {/* <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Check all
                        </Checkbox>
                        <Divider /> */}
                        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
                        <Divider />
                    </div>
                }
                <Form.Item>
                    <Button type="primary">Create Event</Button>
                </Form.Item>
            </Form>
        </div >
    );
};

export default CreateEventForm;
