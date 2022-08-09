import styles from "./Audit.module.scss";
import React, { useState } from "react";
import TopBar from "components/Navigation";

const Audit: React.FC = () => {
	const [showDropDownMenu, setshowDropDownMenu] = useState(false);

	return (
		<div className={styles.auditContainer}>
			<div className={styles.auditContainer__topbar}>
				<TopBar
					setSearchValues={() => ''}
					showDropDownMenu={showDropDownMenu}
					setshowDropDownMenu={setshowDropDownMenu}
				/>
			</div>
		</div>
	);
};

export default Audit;
