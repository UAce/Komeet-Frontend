import React, { useState } from "react";
import { Form, Radio, Input, Button, Checkbox, Divider } from "antd";
import InfiniteCalendar, { Calendar, withMultipleDates } from "react-infinite-calendar";
import format from "date-fns/format";
import "react-infinite-calendar/styles.css"; // Make sure to import the default stylesheet
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

const CreateEventForm: React.FC<CreateEventFormProps> = () => {
    // consts
    const plainOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const defaultselectedDays: CheckboxValueType[] = [];
    const [form] = Form.useForm();
    const [calendarType, setCalendarType] = useState<CalendarType>("dates");
    const [formData, setFormData] = useState<any>({ calendarType: "dates" });
    const today = new Date();
    const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [selectedDates, setSelectedDates] = useState<Date[]>([today]);
    const [selectedDays, setSelectedDays] = useState<CheckboxValueType[]>(defaultselectedDays);
    // const [checkAll, setCheckAll] = useState(false);

    // Handlers
    const onFormChange = (eventFormData: EventForm) => {
        let newFormData = { ...formData, ...eventFormData };
        if (eventFormData.calendarType) {
            setCalendarType(eventFormData.calendarType);
            if (eventFormData.calendarType === "dates") {
                delete newFormData.days;
                newFormData.dates = selectedDates;
            } else {
                delete newFormData.dates;
                newFormData.days = selectedDays;
            }
        }
        setFormData(newFormData);
    };
    const defaultMultipleDateInterpolation = (date: Date, selected: Date[]) => {
        const selectedMap = selected.map(function(date) {
            return format(date, "yyyy-MM-dd");
        });
        const index = selectedMap.indexOf(format(date, "yyyy-MM-dd"));
        const currentlySelected =
            index === -1
                ? ([] as Date[]).concat(selected, [date])
                : ([] as Date[]).concat(selected.slice(0, index), selected.slice(index + 1));
        setSelectedDates(currentlySelected);
        setFormData({ ...formData, dates: currentlySelected });
        return currentlySelected;
    };

    const onDayCheck = (currentlySelected: CheckboxValueType[]) => {
        setSelectedDays(currentlySelected);
        setFormData({ ...formData, days: currentlySelected });
        // setCheckAll(list.length === plainOptions.length);
    };
    // const onCheckAllChange = (e: CheckboxChangeEvent) => {
    //     setSelectedDays(e.target.checked ? plainOptions : []);
    //     setCheckAll(e.target.checked);
    // };
    return (
        <Form form={form} layout="vertical" initialValues={{ calendarType }} onValuesChange={onFormChange}>
            <Form.Item label="Event Name" name="eventName" required>
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
                <InfiniteCalendar
                    Component={withMultipleDates(Calendar)}
                    interpolateSelection={defaultMultipleDateInterpolation}
                    width={350}
                    height={400}
                    selected={selectedDates}
                    minDate={thisWeek}
                />
            ) : (
                <div>
                    {/* <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Check all
                        </Checkbox>
                        <Divider /> */}
                    <CheckboxGroup options={plainOptions} value={selectedDays} onChange={onDayCheck} />
                    <Divider />
                </div>
            )}
            <Form.Item>
                <Button type="primary">Create Event</Button>
            </Form.Item>
            <DebugInfo data={formData} />
        </Form>
    );
};

export default CreateEventForm;
