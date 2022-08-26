import React, { useState, useEffect } from "react";
import cn from "classnames";

import styles from "./Card.module.sass";
import Icon from "../Icon";
const ExploreCollection = ({ className, item }) => {
	const [visible, setVisible] = useState(false);

	return (
		<div className={cn(styles.card, className)}>
			<div className={styles.preview}>
				<img src="/images/blank.jpg" alt="Card" />

				<div className={styles.control}>
					{/* <button
						className={cn(styles.favorite, { [styles.active]: visible })}
						onClick={() => setVisible(!visible)}
					>
						<Icon name="heart" size="20" />
					</button> */}
				</div>
			</div>
			<div className={styles.link}>
				<div className={styles.body}>
					<div className={styles.line}>
						<div className={styles.title}>{item.data}</div>
					</div>
					<div className={styles.line}>
						<div className={styles.title}>{item.name}</div>
						<div className={styles.price}>{item.short_name}</div>
					</div>
					<div className={styles.line}></div>
				</div>
			</div>
		</div>
	);
};

export default ExploreCollection;
