import React from "react";
import { Card as AntCard } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-light-svg-icons";
import styles from "../../components/CardDetail/CardDetail.module.scss";

interface PageTemplateProps {
	children: any;
	onSideNavClick: () => void;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children, onSideNavClick }) => {
	return (
		<AntCard
			className={styles.sidebar}
			extra={<FontAwesomeIcon icon={faXmark} size="lg" onClick={() => onSideNavClick()} />}
			hoverable
			bordered={false}
		>
			{children}
		</AntCard>
	);
};

export default PageTemplate;
