import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./PageList.module.sass";

const PageList = () => {
	return (
		<div className={styles.page}>
			<div className={cn("container", styles.container)}>
				<p>
					<Link to="/">Home Page</Link>
				</p>
				<p>
					<Link to="/upload-variants">Upload Variants</Link>
				</p>
				<p>
					<Link to="/upload-details">Upload Details</Link>
				</p>

				<p>
					<Link to="/search01">Search01</Link>
				</p>
				<p>
					<Link to="/search02">Search02</Link>
				</p>
			</div>
		</div>
	);
};

export default PageList;
