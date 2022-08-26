import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import ExploreCollection from "../../components/ExploreCollection";

import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";

const Search = () => {
	const key = "KabDHuHs4qjV0k1OIDvked1koLGHJf4f";
	const chain_id = 97;

	const [NFTCollections, setNFTColections] = useState([]);

	// console.log(NFTCollections,"NFT collection");
	useEffect(() => {
		getApiData();
	}, []);

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

	const handleSubmit = (e) => {
		alert();
	};

	return (
		<div className={cn("section-pt80", styles.section)}>
			<div className={cn("container", styles.container)}>
				<div className={styles.row}>
					{/* Explore section */}

					{NFTCollections && (
						<div className={styles.wrapper}>
							<div className={styles.list}>
								{NFTCollections.map((x, index) => (
									// <h1 key={index}>NFT collectible {x.data}</h1>
									<ExploreCollection
										className={styles.card}
										item={x}
										key={index}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Search;
