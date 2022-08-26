import React, { useState } from "react";
import styles from "./Footer.module.sass";
const items = [];

const Footers = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		alert();
	};

	return <footer className={styles.footer}></footer>;
};

export default Footers;
