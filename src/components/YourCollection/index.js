import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Card.module.sass";

import stylesListingModal from "./ListingSteps.module.sass";
import "./yourcollection.css";
import Icon from "../Icon";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

import OutsideClickHandler from "react-outside-click-handler";

const YourCollection = ({ className }) => {
	// const [visible, setVisible] = useState(false);
	const { walletAddress, chainId } = useMoralisDapp();
	const [wallet, setwallet] = useState("");
	const [visible, setVisibility] = useState(false);
	const [nftToSend, setNftToSend] = useState(null);
	const [reciever, setreciever] = useState("");

	const [NFTCollections, setNFTColections] = useState([]);
	const key = "KabDHuHs4qjV0k1OIDvked1koLGHJf4f";
	const chain_id = 97;

	useEffect(() => {
		setwallet(walletAddress);
		getApiData();
	}, [walletAddress]);

	const getApiData = async () => {
		await fetch(
			`https://thentic.tech/api/nfts?key=${key}&chain_id=${chain_id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setNFTColections(data.nfts);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				console.log("finally");
			});

		// update the state
		console.log(NFTCollections, "NFT collection");
	};

	const handleSellClick = (item) => {
		setNftToSend(item);
		setVisibility(true);
	};

	const transfer = async () => {
		const metadata = {
			key: key,
			chain_id: chain_id,
			contract: nftToSend.contract,
			nft_id: nftToSend.id,
			from: wallet,
			to: reciever,
		};
		console.log(metadata);

		await fetch(`https://thentic.tech/api/nfts/transfer`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(metadata),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				window.open(data.transaction_url, "_blank");
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				console.log("finally");
			});

		setreciever("");
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.shownft}>
				{NFTCollections.map((item, index) => (
					<div
						onClick={() => handleSellClick(item)}
						key={index}
						className={cn(styles.card, className)}
					>
						<div className={styles.preview}>
							<img
								srcSet="/images/blank.jpg"
								src="/images/blank.jpg"
								alt="Card"
							/>
							<div className={styles.control}>
								{/* <button
									className={cn(styles.favorite, { [styles.active]: visible })}
									onClick={() => {
										// setVisible(!visible)
									}}
								>
									<Icon name="heart" size="20" />
								</button> */}
								<button className={cn("button-small", styles.button)}>
									<span> Transfer NFT </span>
									<Icon name="scatter-up" size="16" />
								</button>
							</div>
						</div>
						<div className={styles.body}>
							<div className={styles.line}>
								<div className={styles.title}>{item.data}</div>
							</div>
							<div className={styles.line}>
								<div className={styles.counter}> {item.name}</div>
								<div className={styles.price}>{item.short_name}</div>
							</div>
						</div>
					</div>
				))}
			</div>
			{visible && (
				// modal code - new
				<div className={styles.modal} id="modal">
					<div className={cn(styles.outer)}>
						<OutsideClickHandler
							onOutsideClick={() => {
								console.log("clici out");
								setVisibility(false);
							}}
						>
							<div className={cn(stylesListingModal.container)}>
								<div className={stylesListingModal.title}>
									<div className={styles.title}>{nftToSend.data}</div>
								</div>

								<div className={cn(className, stylesListingModal.steps)}>
									{/* <div className={cn("h4", stylesListingModal.title)}>Folow steps</div> */}
									<div className={stylesListingModal.list}>
										<div className={stylesListingModal.item}>
											<div className={stylesListingModal.head}>
												<div className={stylesListingModal.details}>
													<div>Enter Reciever Address</div>
													<input
														className={styles.input2}
														placeholder="Enter Reciever Address"
														onChange={(e) => setreciever(e.target.value)}
														style={{
															width: "100%",
															height: "100%",
															border: "none",
														}}
													/>
													{/* <div className={stylesListingModal.text}>
								
							</div> */}
												</div>
											</div>
											<button
												onClick={() => {
													transfer();
												}}
												className={cn("button", stylesListingModal.button)}
											>
												Transfer NFT
											</button>
										</div>
									</div>
								</div>

								<button
									className={styles.close}
									onClick={() => {
										setVisibility(false);
									}}
								>
									<Icon name="close" size="14" />
								</button>
							</div>
						</OutsideClickHandler>
					</div>
				</div>
			)}
		</div>
	);
};

export default YourCollection;
