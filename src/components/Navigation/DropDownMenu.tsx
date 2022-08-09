import { AutoComplete, Input, Form, Button, Select, DatePicker, Spin, Space } from "antd";
import {
	ERRORMESSAGES,
	LIST_OF_APP_NAMES,
	PAGE_SIZE,
	MAX_LENGTH,
	DATE_FORMAT,
} from "utils/constants";
import { OrganisationAutocompleteInterface } from "api/OrganisationAPI";
import styles from "./Navigation.module.scss";
import React, { useEffect, useState } from "react";
import moment from "moment";

interface DropDownMenuProps {
	setSearchValues: (values: any) => void;
	organisationData: OrganisationAutocompleteInterface[];
	organisationDataIsLoading: boolean;
	organisationDataError: boolean;
	showDropDownMenu: boolean;
	setshowDropDownMenu: (value: boolean) => void;
}

const { RangePicker } = DatePicker;

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 17 },
};

const DropDownMenu: React.FC<DropDownMenuProps> = ({
	setSearchValues,
	organisationData,
	organisationDataIsLoading,
	organisationDataError,
	showDropDownMenu,
	setshowDropDownMenu,
}) => {
	const [form] = Form.useForm();
	const [formSearchValues, setFormSearchValues] = useState<any>({});

	useEffect(() => {
		if (Object.keys(formSearchValues).length === 0) return;
		form.setFieldsValue({
			datetime: formSearchValues["datetime"]
				? [
						moment(formSearchValues["datetime"][0], DATE_FORMAT),
						moment(formSearchValues["datetime"][1], DATE_FORMAT),
				  ]
				: "",
			user: formSearchValues["user"],
			message: formSearchValues["message"],
			organisation: formSearchValues["organisation"],
			application: formSearchValues["application"],
		});
	}, [form, formSearchValues]);

	const onReset = () => {
		setFormSearchValues({ Offset: 0, Limit: PAGE_SIZE });
		setSearchValues({ Offset: 0, Limit: PAGE_SIZE });
		form.resetFields();
	};

	const onFinish = (values: any) => {
		values.Offset = 0;
		values.Limit = PAGE_SIZE;

		if (values["datetime"]) {
			values.StartTimestamp = values["datetime"][0];
			values.EndTimestamp = values["datetime"][1];
		}

		Object.keys(values).forEach((key) => {
			if (values[key] === "") {
				delete values[key];
			}
		});

		setFormSearchValues(JSON.parse(JSON.stringify(values)));
		setSearchValues(JSON.parse(JSON.stringify(values)));
		setshowDropDownMenu(false);
	};

	return (
		<Form
			data-testid="drop-downMenu"
			form={form}
			initialValues={{ pagesize: PAGE_SIZE }}
			onFinish={onFinish}
			layout="horizontal"
			size="small"
			className={`${styles.topbar__searchbarDropdown} ${
				showDropDownMenu ? styles.topbar__searchbarDropdown_expanded : ""
			} `}
			{...formItemLayout}
		>
			<Form.Item label="Date / Time:" name="datetime">
				<RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
			</Form.Item>
			<Form.Item label="User:" name="user">
				<Input
					data-lpignore="true"
					placeholder="Display name or email"
					maxLength={MAX_LENGTH}
					allowClear
				/>
			</Form.Item>
			<Form.Item label="Message:" name="message">
				<Input placeholder="Message" maxLength={MAX_LENGTH} allowClear />
			</Form.Item>
			<Form.Item label="Organisation:" name="organisation">
				{organisationDataIsLoading ? (
					<Spin />
				) : (
					<AutoComplete
						options={organisationData}
						filterOption={(inputValue, option) =>
							option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						}
						placeholder={
							organisationDataError
								? ERRORMESSAGES.server
								: "Search or choose the organisation name from the list"
						}
						maxLength={MAX_LENGTH}
						allowClear
					/>
				)}
			</Form.Item>
			<Form.Item label="Application:" name="application">
				<Select placeholder="Select the application name">
					{LIST_OF_APP_NAMES.map((appName) => (
						<Select.Option key={appName} value={appName}>
							{appName}
						</Select.Option>
					))}
				</Select>
			</Form.Item>

			<Space className={styles.topbar__searchbarDropdown_buttons}>
				<Button type="primary" htmlType="submit">
					Apply
				</Button>
				<Button htmlType="button" onClick={onReset}>
					Reset
				</Button>
			</Space>
		</Form>
	);
};

export default DropDownMenu;
