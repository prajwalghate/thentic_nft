import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Payments.module.sass";
import Dropdown from "../../components/Dropdown";
import Icon from "../../components/Icon";
import TextInput from "../../components/TextInput";
import Loader from "../../components/Loader";

const Payments = () => {
	const [amount, setAmount] = useState("");
	const [to, setto] = useState("");

	const key = "KabDHuHs4qjV0k1OIDvked1koLGHJf4f";
	const chain_id = 97;
	useEffect(() => {}, []);

	const onSubmit = async (e) => {
		// e.preventDefault();

		try {
			const metadata = {
				key: key,
				chain_id: chain_id,
				amount: amount,
				to: to,
			};
			console.log(metadata);

			await fetch(`https://thentic.tech/api/invoices/new`, {
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

			setAmount("");
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
							<div className={cn("h2", styles.title)}>Make a Payment</div>
						</div>
						<form className={styles.form} action="">
							<div className={styles.list}>
								<div className={styles.item}>
									<div className={styles.category}>Payment Details</div>
									<div className={styles.fieldset}>
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
										<TextInput
											className={styles.field}
											label="Amount"
											name="Item"
											type="Integer"
											placeholder="Enter Amount"
											required
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
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
									<span>Make NFT</span>
									<Icon name="arrow-next" size="10" />
								</button>
								<div className={styles.saving}>
									<span>Auto saving</span>
									<Loader className={styles.loader} />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Payments;
