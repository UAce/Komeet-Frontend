import React, { useState } from "react";
import { Form, Radio, Input, notification, Button, Checkbox, Divider } from "antd";

import { Calendar, withMultipleDates } from "react-infinite-calendar";
import format from "date-fns/format";
import "react-infinite-calendar/styles.css";
import "antd/dist/antd.css";

import "./CreateEventForm.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import DebugInfo from "../DebugInfo/DebugInfo";

type CalendarType = "dates" | "days";

interface EventForm {
    eventName: string;
    eventDescription: string;
    calendarType: CalendarType;
}

interface CreateEventFormProps {}
const CheckboxGroup = Checkbox.Group;
const MultipleDatesCalendar = withMultipleDates(Calendar);

const CreateEventForm: React.FC<CreateEventFormProps> = () => {
    // consts
    const weekDaysOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const defaultselectedDays: CheckboxValueType[] = [];
    const [form] = Form.useForm();
    const [calendarType, setCalendarType] = useState<CalendarType>("dates");
    const today = new Date();
    const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [selectedDays, setSelectedDays] = useState<CheckboxValueType[]>(defaultselectedDays);
    const [checkAll, setCheckAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(true);

    // Handlers
    const onFormChange = (eventFormData: EventForm) => {
        if (eventFormData.calendarType) {
            setCalendarType(eventFormData.calendarType);
            const currentlySelected = eventFormData.calendarType === "dates" ? selectedDates : selectedDays;
            form.setFieldsValue({ selected: currentlySelected });
        }
    };
    const defaultMultipleDateInterpolation = (date: Date, selected: Date[]) => {
        const selectedMap = selected.map(function(date) {
            return format(date, "YYYY-MM-dd");
        });
        const index = selectedMap.indexOf(format(date, "YYYY-MM-dd"));
        const currentlySelected =
            index === -1
                ? ([] as Date[]).concat(selected, [date])
                : ([] as Date[]).concat(selected.slice(0, index), selected.slice(index + 1));
        setSelectedDates(currentlySelected);
        form.setFieldsValue({ selected: currentlySelected });
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
    const onFinish = (values: any) => {
        console.log(values);
        notification.info({
            message: "Creating Event..",
            placement: "topRight"
        });
        // TODO: Send request to server and redirect to Event page
    };
    const onFinishFailed = (values: any) => {
        console.error(values);
    };
    return (
        <>
            {/* <DebugInfo data={form.getFieldsValue()} /> */}
            <Form
                form={form}
                layout="vertical"
                initialValues={{ calendarType }}
                onValuesChange={onFormChange}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError={true}
            >
                <Form.Item
                    label="Event Name"
                    name="eventName"
                    required
                    rules={[{ required: true, message: "Please enter an event name" }]}
                >
                    <Input placeholder="e.g. March Book Club" />
                </Form.Item>
                <Form.Item label="Event Description" name="eventDescription">
                    <Input placeholder="e.g. At Park Lafontaine from 2pm to 3pm" />
                </Form.Item>

                <Form.Item name="calendarType">
                    <Radio.Group buttonStyle="solid" value={calendarType}>
                        <Radio.Button value="dates">SPECIFIC DATES</Radio.Button>
                        <Radio.Button value="days">DAYS OF WEEK</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                {calendarType === "dates" ? (
                    <Form.Item name="selected" rules={[{ required: true, message: "Please select at least one date" }]}>
                        <MultipleDatesCalendar
                            width={400}
                            height={400}
                            interpolateSelection={defaultMultipleDateInterpolation}
                            selected={selectedDates}
                            minDate={thisWeek}
                            onSelect={(selectedDate: Date) =>
                                defaultMultipleDateInterpolation(selectedDate, selectedDates)
                            }
                        />
                    </Form.Item>
                ) : (
                    <Form.Item
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
                    <div className="create-event-button-wrapper">
                        <Button type="primary" htmlType="submit">
                            Create Event
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateEventForm;
