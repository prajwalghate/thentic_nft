import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import cn from "classnames";
import styles from "./Header.module.sass";
import Image from "../Image";
import User from "./User";

const nav = [
	// {
	// 	url: "/search01",
	// 	title: "Discover",
	// },
	{
		url: "/yourcollection",
		title: "Discover",
	},
];

const Headers = () => {
	const [visibleNav, setVisibleNav] = useState(false);
	const [search, setSearch] = useState("");

	const handleSubmit = (e) => {
		alert();
	};

	return (
		<header className={styles.header}>
			<div className={cn("container", styles.container)}>
				<Link className={styles.logo} to="/">
					<div>Thentic Market Place</div>
				</Link>
				<div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
					<nav className={styles.nav}>
						{nav.map((x, index) => (
							<Link
								className={styles.link}
								// activeClassName={styles.active}
								to={x.url}
								key={index}
							>
								{x.title}
							</Link>
						))}
					</nav>

					<Link
						className={cn("button-small", styles.button)}
						to="/upload-variants"
					>
						Upload
					</Link>
				</div>
				<Link
					className={cn("button-small", styles.button)}
					to="/upload-variants"
				>
					Create
				</Link>
				{/* <Link
					className={cn("button-stroke button-small", styles.button)}
					to="/connect-wallet"
				>
					Connect Wallet
				</Link> */}

				<User className={styles.user} />
				<button
					className={cn(styles.burger, { [styles.active]: visibleNav })}
					onClick={() => setVisibleNav(!visibleNav)}
				></button>
			</div>
		</header>
	);
};

export default Headers;
