import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./UploadDetails.module.sass";
import Dropdown from "../../components/Dropdown";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";

const Upload = (props) => {
	const [name, setName] = useState("");
	const [to, setto] = useState("");

	const key = "KabDHuHs4qjV0k1OIDvked1koLGHJf4f";
	const chain_id = 97;
	const type = props.location.state.type;
	const [selectedcontract, setselectedcontract] = useState(0);
	const [NFTCollections, setNFTColections] = useState([]);

	useEffect(() => {
		getApiData();
	}, []);

	const getApiData = async () => {
		await fetch(
			`https://thentic.tech/api/contracts?key=${key}&chain_id=${chain_id}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				// body: JSON.stringify({
				// 	chainId: 97,
				// 	key: "KabDHuHs4qjV0k1OIDvked1koLGHJf4f",
				// }),
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setNFTColections(data.contracts);
			})
			.catch((error) => {
				console.log(error);
			})
			.finally(() => {
				console.log("finally");
			});
	};

	const createContract = async () => {
		await fetch(`https://thentic.tech/api/nfts/contract`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				key: key,
				chain_id: chain_id,
				name: "Prajwal's Collection 3",
				short_name: "PGC3",
				// redirect_url: "http://localhost:3000/",
			}),
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
	};

	const onSubmit = async (e) => {
		// e.preventDefault();

		try {
			const metadata = {
				key: key,
				chain_id: chain_id,
				contract: NFTCollections[selectedcontract].contract,
				nft_id: 1,
				nft_data: name,
				to: to,
			};
			console.log(metadata);

			await fetch(`https://thentic.tech/api/nfts/mint`, {
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

			setName("");
			setto("");
		} catch (err) {
			console.error(err);
			alert("An error occured!");
		}
	};

	return (
		<>
			<div className={cn("section", styles.section)}>
				<div className={cn("container", styles.container)}>
					<div className={styles.wrapper}>
						<div className={styles.head}>
							<div className={cn("h2", styles.title)}>
								Create single collectible
							</div>
						</div>
						{NFTCollections.length > 0 && type == "nft" ? (
							<>
								<form className={styles.form} action="">
									<div className={styles.list}>
										<div className={styles.item}>
											<div className={styles.category}>NFT Details</div>
											<div className={styles.fieldset}>
												<TextInput
													className={styles.field}
													label="NFT data"
													name="Item"
													type="text"
													placeholder='e. g. Redeemable Bitcoin Card with logo"'
													required
													value={name}
													onChange={(e) => setName(e.target.value)}
												/>
												<TextInput
													className={styles.field}
													label="Reciever Address"
													name="to"
													type="text"
													placeholder="Enter Reciever Address starting with 0x"
													required
													value={to}
													onChange={(e) => setto(e.target.value)}
												/>
											</div>
											<div style={{ marginTop: 25 }} className={styles.field}>
												<div className={styles.label}>Selected Contract</div>
												<Dropdown
													className={styles.dropdown}
													value={NFTCollections[selectedcontract].name}
													setValue={(item) => {
														console.log(item);
														const index = NFTCollections.findIndex((object) => {
															return object.name === item;
														});
														//   setindex()
														setselectedcontract(index);
														console.log(index);
													}}
													options={NFTCollections.map((item) => item.name)}
												/>
											</div>
										</div>
									</div>

									<div className={styles.foot}>
										<button
											className={cn("button-stroke tablet-show", styles.button)}
											onClick={() => {}}
											type="button"
										>
											Preview
										</button>
										<button
											className={cn("button", styles.button)}
											onClick={() => onSubmit()}
											// type="button" hide after form customization
											type="button"
										>
											<span>Create NFT</span>
											<Icon name="arrow-next" size="10" />
										</button>
										<div className={styles.saving}>
											<span>Auto saving</span>
											<Loader className={styles.loader} />
										</div>
									</div>
								</form>
							</>
						) : (
							<button
								onClick={() => {
									createContract();
									// window.open("h", "_blank");
								}}
								className={cn("button-stroke button-small", styles.button)}
							>
								Create New Contract(Collection)
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Upload;
