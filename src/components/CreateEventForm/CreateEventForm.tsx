import React, { useState, useRef, RefObject, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Form, Radio, Input, notification, Checkbox, Divider } from "antd";
import { Calendar, withMultipleDates } from "react-infinite-calendar";
import format from "date-fns/format";
import "react-infinite-calendar/styles.css";
import "antd/dist/antd.css";

import "./CreateEventForm.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CalendarType, EventFormData, CreateEventResponse } from "../../interfaces/EventInterfaces";
import DebugInfo from "../DebugInfo/DebugInfo";
import { createEvent } from "../../common/api/EventsApis";
import CustomButton from "../CustomButton/CustomButton";

interface CreateEventFormProps extends RouteComponentProps {}
const CheckboxGroup = Checkbox.Group;
const MultipleDatesCalendar = withMultipleDates(Calendar);

const CreateEventForm: React.FC<CreateEventFormProps> = ({ history }) => {
    // consts
    const weekDaysOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [form] = Form.useForm();
    const nameRef = useRef<Input>() as RefObject<Input>; // Ugly hack to fit the type
    const [calendarType, setCalendarType] = useState<CalendarType>("dates");
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [selectedDays, setSelectedDays] = useState<CheckboxValueType[]>([]);
    const [checkAll, setCheckAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);
    const datesToString = (dates: Date[]) => dates.map((date) => format(date, "YYYY-MM-DD"));

    // Calendar Handlers
    const defaultMultipleDateInterpolation = (date: Date, selected: Date[]) => {
        const selectedMap = datesToString(selected);
        const index = selectedMap.indexOf(format(date, "YYYY-MM-DD"));
        const currentlySelected =
            index === -1
                ? ([] as Date[]).concat(selected, [date])
                : ([] as Date[]).concat(selected.slice(0, index), selected.slice(index + 1));
        setSelectedDates(currentlySelected);
        form.setFieldsValue({ selected: datesToString(currentlySelected) });
        return currentlySelected;
    };
    const onDayCheck = (currentlySelected: CheckboxValueType[]) => {
        setSelectedDays(currentlySelected);
        form.setFieldsValue({ selected: currentlySelected });
        setIndeterminate(!!currentlySelected.length && currentlySelected.length < weekDaysOptions.length);
        setCheckAll(currentlySelected.length === weekDaysOptions.length);
    };
    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        const currentlySelected = e.target.checked ? weekDaysOptions : [];
        setSelectedDays(currentlySelected);
        form.setFieldsValue({ selected: currentlySelected });
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    // Form Handlers
    const onFormChange = (eventFormData: EventFormData) => {
        if (eventFormData.calendarType) {
            setCalendarType(eventFormData.calendarType);
            const currentlySelected =
                eventFormData.calendarType === "dates" ? datesToString(selectedDates) : selectedDays;
            form.setFieldsValue({ selected: currentlySelected });
        }
    };
    const onFormFinish = async (values: EventFormData) => {
        try {
            const newEvent: CreateEventResponse = await createEvent(values);
            history.push(`/event/${newEvent.id}`);
        } catch (error) {
            console.error(error);
            notification.error({
                message: "Oops, something went wrong creating your event",
                description: "Please contact support",
                placement: "topRight"
            });
        }
    };
    const onFormFinishFailed = (values: any) => {
        console.error(values);
    };

    useEffect(() => {
        // Ugly hack to autofocus on the event name input
        nameRef!.current!.input.focus();
    }, []);
    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={{ calendarType }}
            onValuesChange={onFormChange}
            onFinish={onFormFinish}
            onFinishFailed={onFormFinishFailed}
            scrollToFirstError={true}
        >
            <Form.Item
                label="Event Name"
                name="name"
                required
                rules={[{ required: true, message: "Please enter an event name" }]}
            >
                <Input autoFocus ref={nameRef} placeholder="e.g. March Book Club" />
            </Form.Item>
            <Form.Item label="Event Description" name="description">
                <Input placeholder="e.g. At Park Lafontaine from 2pm to 3pm" />
            </Form.Item>

            <Form.Item name="calendarType">
                <Radio.Group buttonStyle="solid" value={calendarType}>
                    <Radio.Button style={{ borderRadius: "8px 0 0 8px" }} value="dates">
                        SPECIFIC DATES
                    </Radio.Button>
                    <Radio.Button style={{ borderRadius: "0 8px 8px 0" }} value="days">
                        DAYS OF WEEK
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>
            {calendarType === "dates" ? (
                <Form.Item
                    name="selected"
                    id="weekdays"
                    rules={[{ required: true, message: "Please select at least one date" }]}
                >
                    <MultipleDatesCalendar
                        height={300}
                        interpolateSelection={defaultMultipleDateInterpolation}
                        selected={selectedDates}
                        minDate={thisWeek}
                        onSelect={(selectedDate: Date) => defaultMultipleDateInterpolation(selectedDate, selectedDates)}
                    />
                </Form.Item>
            ) : (
                <Form.Item
                    id="calendar"
                    name="selected"
                    rules={[{ required: true, message: "Please select at least one day of the week" }]}
                >
                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        Check all
                    </Checkbox>
                    <Divider />
                    <CheckboxGroup options={weekDaysOptions} value={selectedDays} onChange={onDayCheck} />{" "}
                </Form.Item>
            )}

            <Divider />
            <Form.Item>
                <CustomButton text="Create Event" htmlType="submit" />
            </Form.Item>
            {/* <DebugInfo data={form.getFieldsValue()} /> */}
        </Form>
    );
};

export default withRouter(CreateEventForm);
