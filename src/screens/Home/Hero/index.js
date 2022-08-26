import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Hero.module.sass";
// import Bid from "../../../components/Bid";

const Hero = () => {
	return (
		<>
			<div className={cn("section", styles.section)}>
				<div className={cn("container", styles.container)}>
					<div className={styles.head}>
						<div className={styles.stage}>
							Create, explore, & collect digital art NFTs.
						</div>
						<h2 className={cn("h3", styles.title)}>
							The new creative economy.
						</h2>
						<Link className={cn("button-stroke", styles.button)} to="/search01">
							Mint your NFT
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
