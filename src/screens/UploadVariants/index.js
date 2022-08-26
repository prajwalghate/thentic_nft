import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./UploadVariants.module.sass";
import Control from "../../components/Control";

const breadcrumbs = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Upload Item",
	},
];

const items = [
	{
		url: "/upload-details",
		buttonText: "Create NFT",
		image: "/images/content/upload-pic-1.jpg",
		image2x: "/images/content/upload-pic-1@2x.jpg",
		type: "nft",
	},
	{
		url: "/upload-details",
		buttonText: "Create Contract",
		image: "/images/content/upload-pic-2.jpg",
		image2x: "/images/content/upload-pic-2@2x.jpg",
		type: "contract",
	},
];

const Upload = () => {
	return (
		<div className={styles.page}>
			<Control className={styles.control} item={breadcrumbs} />
			<div className={cn("section-pt80", styles.section)}>
				<div className={cn("container", styles.container)}>
					<div className={styles.top}>
						<h1 className={cn("h2", styles.title)}>Upload item</h1>
					</div>
					<div className={styles.list}>
						{items.map((x, index) => (
							<div className={styles.item} key={index}>
								<div className={styles.preview}>
									<img srcSet={`${x.image2x} 2x`} src={x.image} alt="Upload" />
								</div>
								<Link
									className={cn("button-stroke", styles.button)}
									to={{
										pathname: x.url,
										state: { type: x.type },
									}}
								>
									{x.buttonText}
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Upload;
