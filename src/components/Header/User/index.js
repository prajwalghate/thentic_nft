import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";

import { useMoralisDapp } from "../../../providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";

const items = [
	{
		title: "My profile",
		icon: "user",
		url: "/profile",
	},
	{
		title: "My items",
		icon: "image",
		url: "/item",
	},
	{
		title: "Dark theme",
		icon: "bulb",
	},
	{
		title: "Disconnect",
		icon: "exit",
		url: "https://ui8.net/ui8/products/crypter-nft-marketplace-ui-kit",
	},
];

const User = ({ className }) => {
	const [visible, setVisible] = useState(false);
	const { authenticate, isAuthenticated, logout } = useMoralis();
	const { walletAddress, chainId } = useMoralisDapp();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [address, setAddress] = useState(" ");
	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		setAddress(walletAddress);
	}, [address, walletAddress]);
	const Copy = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="#1780FF"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			style={{ cursor: "pointer" }}
			onClick={() => {
				navigator.clipboard.writeText(address);
				setIsClicked(true);
			}}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M15 3v4a1 1 0 0 0 1 1h4" />
			<path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
			<path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
			<title id="copy-address">Copy Address</title>
		</svg>
	);
	const Check = () => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="3"
			stroke="#21BF96"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 12l5 5l10 -10" />
			<title id="copied-address">Copied!</title>
		</svg>
	);

	return (
		<OutsideClickHandler
			onOutsideClick={() => {
				// setVisible(false)
			}}
		>
			<div className={cn(styles.user, className)}>
				<div
					className={styles.head}
					onClick={() => {
						// setVisible(!visible)
						// console.log('skubfdk')
						if (!isAuthenticated) {
							authenticate().then(() => {
								setAddress(walletAddress);
							});
						}
						// !isAuthenticated ? authenticate() : null;
					}}
				>
					{/* <div className={styles.avatar}>
            <img src="/images/content/avatar-user.jpg" alt="Avatar" />
          </div> */}
					{/* <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          
          */}

					<div className={styles.wallet}>
						{address !== undefined ? address.substring(0, 7) : "Autheticate"}...{" "}
						{isClicked ? <Check /> : <Copy />}
					</div>
				</div>
				{visible && (
					<div className={styles.body}>
						<div className={styles.name}>Enrico Cole</div>
						<div className={styles.code}>
							<div className={styles.number}>0xc4c16ab5ac7d...b21a</div>
							<button className={styles.copy}>
								<Icon name="copy" size="16" />
							</button>
						</div>
						<div className={styles.wrap}>
							<div className={styles.line}>
								<div className={styles.preview}>
									<img
										src="/images/content/etherium-circle.jpg"
										alt="Etherium"
									/>
								</div>
								<div className={styles.details}>
									<div className={styles.info}>Balance</div>
									<div className={styles.price}>4.689 ETH</div>
								</div>
							</div>
							<button
								className={cn("button-stroke button-small", styles.button)}
							>
								Manage fun on Coinbase
							</button>
						</div>
						<div className={styles.menu}>
							{items.map((x, index) =>
								x.url ? (
									x.url.startsWith("http") ? (
										<a
											className={styles.item}
											href={x.url}
											rel="noopener noreferrer"
											key={index}
										>
											<div className={styles.icon}>
												<Icon name={x.icon} size="20" />
											</div>
											<div className={styles.text}>{x.title}</div>
										</a>
									) : (
										<Link
											className={styles.item}
											to={x.url}
											onClick={() => setVisible(!visible)}
											key={index}
										>
											<div className={styles.icon}>
												<Icon name={x.icon} size="20" />
											</div>
											<div className={styles.text}>{x.title}</div>
										</Link>
									)
								) : (
									<div className={styles.item} key={index}>
										<div className={styles.icon}>
											<Icon name={x.icon} size="20" />
										</div>
										<div className={styles.text}>{x.title}</div>
										<Theme className={styles.theme} />
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</OutsideClickHandler>
	);
};

export default User;
