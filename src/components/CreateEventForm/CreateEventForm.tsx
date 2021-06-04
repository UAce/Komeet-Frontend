import React, { useState, useRef, useEffect, MutableRefObject } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Form, Radio, Input, notification, Checkbox, Divider, Select } from "antd";
import { Calendar, withMultipleDates } from "react-infinite-calendar";
import format from "date-fns/format";
import "react-infinite-calendar/styles.css";
import "antd/dist/antd.css";

import "./CreateEventForm.scss";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CalendarType, EventFormData, EventData } from "../../interfaces/EventInterfaces";
import DebugInfo from "../DebugInfo/DebugInfo";
import { createEvent } from "../../common/api/EventsApis";
import CustomButton from "../CustomButton/CustomButton";

interface CreateEventFormProps extends RouteComponentProps {}
const { Group: CheckboxGroup } = Checkbox;
const { Item } = Form;
const { Option } = Select;
const { Button, Group } = Radio;
const MultipleDatesCalendar = withMultipleDates(Calendar);

const CreateEventForm: React.FC<CreateEventFormProps> = ({ history }) => {
    // consts
    const weekDaysOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const [form] = Form.useForm();
    const nameRef = useRef<Input>() as MutableRefObject<Input>;
    const [calendarType, setCalendarType] = useState<CalendarType>("dates");
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [selectedDays, setSelectedDays] = useState<CheckboxValueType[]>([]);
    const [checkAll, setCheckAll] = useState<boolean>(false);
    const [indeterminate, setIndeterminate] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
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
            setSubmitting(true);
            const newEvent: EventData = await createEvent(values);
            history.push(`/event/${newEvent.eventId}`);
        } catch (error) {
            setSubmitting(false);
            console.error(error);
            notification.error({
                message: "Oops, something went wrong!",
                description: "Failed to create event, please contact support.",
                placement: "topRight"
            });
        }
    };

    useEffect(() => {
        nameRef.current.input.focus();
    }, []);
    return (
        <Form
            form={form}
            name="createEventForm"
            layout="vertical"
            initialValues={{ calendarType }}
            onValuesChange={onFormChange}
            onFinish={onFormFinish}
            scrollToFirstError={true}
            style={{ textAlign: "center" }}
        >
            <div className="form-container">
                <div className="form-subcontainer">
                    <Item
                        label="Event Name"
                        name="name"
                        required
                        rules={[{ required: true, message: "Please enter an event name" }]}
                    >
                        <Input autoFocus ref={nameRef} placeholder="e.g. March Book Club" />
                    </Item>
                    <Item label="Event Description" name="description">
                        <Input placeholder="e.g. At Park Lafontaine from 2pm to 3pm" />
                    </Item>
                    <Item
                        initialValue="9:00"
                        label="Start Time"
                        name="startTime"
                        tooltip="Events can only start at 9:00 AM"
                    >
                        <Select value="9:00" disabled>
                            ]<Option value="9:00">9:00 AM</Option>
                        </Select>
                    </Item>
                    <Item
                        initialValue="00:00"
                        label="End Time"
                        name="endTime"
                        tooltip="Events can only end at 12:00 AM"
                    >
                        <Select value="00:00" disabled>
                            ]<Option value="00:00">12:00 AM</Option>
                        </Select>
                    </Item>
                    <Item
                        initialValue="America/Montreal"
                        label="Timezone"
                        name="timezone"
                        tooltip="Only America/Montreal timezone is supported at the moment"
                    >
                        <Select value="America/Montreal" disabled>
                            ]<Option value="America/Montreal">America/Montreal</Option>
                        </Select>
                    </Item>
                </div>
                <div className="form-subcontainer">
                    <Item name="calendarType" style={{ marginBottom: "0" }}>
                        <Group buttonStyle="solid" value={calendarType}>
                            <Button style={{ borderRadius: "8px 0 0 8px" }} value="dates">
                                SPECIFIC DATES
                            </Button>
                            <Button style={{ borderRadius: "0 8px 8px 0" }} value="days">
                                DAYS OF WEEK
                            </Button>
                        </Group>
                    </Item>
                    {calendarType === "dates" ? (
                        <Item
                            style={{ marginTop: "0" }}
                            name="selected"
                            id="weekdays"
                            rules={[{ required: true, message: "Please select at least one date" }]}
                        >
                            <MultipleDatesCalendar
                                height={250}
                                interpolateSelection={defaultMultipleDateInterpolation}
                                selected={selectedDates}
                                minDate={thisWeek}
                                onSelect={(selectedDate: Date) =>
                                    defaultMultipleDateInterpolation(selectedDate, selectedDates)
                                }
                            />
                        </Item>
                    ) : (
                        <Item
                            id="calendar"
                            name="selected"
                            rules={[{ required: true, message: "Please select at least one day of the week" }]}
                        >
                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                Check all
                            </Checkbox>
                            <Divider />
                            <CheckboxGroup options={weekDaysOptions} value={selectedDays} onChange={onDayCheck} />{" "}
                        </Item>
                    )}
                </div>
            </div>

            <Divider />
            <Item>
                <CustomButton text="Create Event" htmlType="submit" loading={submitting} />
            </Item>
            {/* <DebugInfo data={form.getFieldsValue()} /> */}
        </Form>
    );
};

export default withRouter(CreateEventForm);
