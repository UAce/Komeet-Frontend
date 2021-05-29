import React, { FormEventHandler, useState } from "react";
import { Form, Radio, Input, notification, Button, Space, Checkbox, Divider } from "antd";

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
const MultipleDatesCalendar = withMultipleDates(Calendar);

const CreateEventForm: React.FC<CreateEventFormProps> = () => {
    // consts
    const weekDaysOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
        const newFormData = { ...formData, ...eventFormData };
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
        // setCheckAll(list.length === weekDaysOptions.length);
    };
    // const onCheckAllChange = (e: CheckboxChangeEvent) => {
    //     setSelectedDays(e.target.checked ? weekDaysOptions : []);
    //     setCheckAll(e.target.checked);
    // };
    // const onSubmit: FormEventHandler<HTMLButtonElement> = e => {
    //     e.preventDefault();
    //     form.validateFields()
    //         .then(values => {
    //             console.log("Submit values", values);
    //             throw new Error("test");
    //             // Submit values
    //             // submitValues(values);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             notification.error({
    //                 message: `Failed to create event`,
    //                 description: `Error: ${error.stack}`,
    //                 placement: "topRight"
    //             });
    //         });
    // };
    return (
        <>
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
                    <MultipleDatesCalendar
                        interpolateSelection={defaultMultipleDateInterpolation}
                        width={350}
                        height={400}
                        selected={selectedDates}
                        minDate={thisWeek}
                        onSelect={(selectedDate: Date) => defaultMultipleDateInterpolation(selectedDate, selectedDates)}
                    />
                ) : (
                    <div>
                        {/* <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Check all
                        </Checkbox>
                        <Divider /> */}
                        <CheckboxGroup options={weekDaysOptions} value={selectedDays} onChange={onDayCheck} />
                        <Divider />
                    </div>
                )}
                {/* <Button type="primary" htmlType="submit" onSubmit={onSubmit}>
                Create Event
            </Button> */}
                <DebugInfo data={formData} />
            </Form>
        </>
    );
};

export default CreateEventForm;
