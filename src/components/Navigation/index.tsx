import { useState } from "react";
import { Input } from "antd";
import { MAX_LENGTH } from "utils/constants";
import styles from "./Navigation.module.scss";
import useOrganisation from "./useOrganisation";
import { determineSearch, useKeyPress, useWindowDimensions } from "utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsFilter, faMagnifyingGlass, faArrowLeftLong } from "@fortawesome/pro-light-svg-icons";
import DropDownMenu from "./DropDownMenu";

interface TopBarProps {
	setSearchValues: (values: any) => void;
	showDropDownMenu: boolean;
	setshowDropDownMenu: (value: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({
	setSearchValues,
	showDropDownMenu,
	setshowDropDownMenu,
}) => {
	const [organisationData, organisationDataIsLoading, organisationDataError] = useOrganisation();
	useKeyPress(() => setshowDropDownMenu(false), ["Escape"]);
	const [searchIconClicked, setSearchIconClicked] = useState(false);
	const [isMobile] = useWindowDimensions();
	const isMobileSearch = isMobile(775);

	return (
		<>
			<div className={styles.topbar} data-testid="navigation">
				<h1
					className={styles.topbar__heading}
					style={{ display: !isMobileSearch || !searchIconClicked ? "flex" : "none" }}
				>
					Audit log
				</h1>

				<Input
					data-testid="navigation-searchbar"
					style={{ display: !isMobileSearch || searchIconClicked ? "flex" : "none" }}
					allowClear
					onChange={(data: any) => {
						setSearchValues(determineSearch(data.target.value, organisationData));
					}}
					size="large"
					maxLength={MAX_LENGTH}
					className={styles.topbar__searchbar}
					placeholder="Search audit logs"
					suffix={
						<FontAwesomeIcon
							className={styles.topbar__searchbarIcon}
							icon={faBarsFilter}
							size="lg"
							onClick={() => setshowDropDownMenu(!showDropDownMenu)}
						/>
					}
				/>

				<FontAwesomeIcon
					data-testid="navigation-searchbar-dropdown-icon"
					className={styles.topbar__leftArrowIcon}
					icon={faArrowLeftLong}
					size="lg"
					onClick={() => setSearchIconClicked(false)}
					style={{ display: isMobileSearch && searchIconClicked ? "flex" : "none" }}
				/>

				<FontAwesomeIcon
					className={styles.topbar__searchIcon}
					icon={faMagnifyingGlass}
					size="lg"
					onClick={() => setSearchIconClicked(true)}
					style={{ display: isMobileSearch && !searchIconClicked ? "flex" : "none" }}
				/>

				{!isMobileSearch || searchIconClicked ? (
					<DropDownMenu
						setSearchValues={setSearchValues}
						organisationData={organisationData}
						organisationDataIsLoading={organisationDataIsLoading}
						organisationDataError={organisationDataError}
						showDropDownMenu={showDropDownMenu}
						setshowDropDownMenu={setshowDropDownMenu}
					/>
				) : null}
			</div>
		</>
	);
};

export default TopBar;
