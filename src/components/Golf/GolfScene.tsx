import styled from "styled-components";

export const GolfSceneSVG = () => {
	return (
		<svg width="763" height="220" viewBox="0 0 763 220" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M254.5 94C254.5 103.389 209.103 117.5 142 117.5C74.8974 117.5 12.5 108.389 12.5 99C12.5 89.6112 98.3974 76 165.5 76C232.603 76 254.5 84.6112 254.5 94Z" fill="var(--color-fringe)"/>
			<path d="M242.5 93.3133C242.5 100.779 201.792 112 141.622 112C81.4514 112 25.5 104.755 25.5 97.2892C25.5 89.8233 102.524 79 162.694 79C222.865 79 242.5 85.8474 242.5 93.3133Z" fill="var(--color-golf-green)"/>
			<path d="M147.5 88C147.5 91.3137 139 92 137 92C134 92 126.5 91.3137 126.5 88C126.5 84.6863 134 83.5 137 83.5C140 83.5 147.5 84.6863 147.5 88Z" fill="black"/>
			<line x1="137" y1="88.0058" x2="135.977" y2="0.00607811" stroke="var(--color-flag-stick)"/>
			<rect x="136.5" width="35" height="20" fill="var(--color-water)"/>
			{/* <path d="M763 189.161C763 204.073 688.387 219.161 613 219.161C537.613 219.161 462 185.573 462 170.661C462 155.749 531.5 157.161 624 170.661C706.5 174.161 763 174.249 763 189.161Z" fill="#183A92"/> */}
			<path d="M133.5 132C133.5 144.15 112.242 159.5 78 159.5C43.7583 159.5 0 129.65 0 117.5C0 105.35 31.2583 117.5 65.5 117.5C99.7417 117.5 133.5 119.85 133.5 132Z" fill="var(--color-sand)"/>
			<path d="M266.749 141.461C266.749 153.611 242.491 150.961 208.249 150.961C195.749 146.461 189.249 138.611 189.249 126.461C189.249 114.31 240.507 107.961 274.749 107.961C308.991 107.961 266.749 129.31 266.749 141.461Z" fill="var(--color-sand)"/>
		</svg>
	)
}

export const GolfScene = styled.div`
	position: relative;
	z-index: 4;
	svg {
		overflow: hidden;
		display: block;
		position: absolute;
		top: 270px;
		right: 7%;
		width: 100%;
	}
	@media (max-width: 1750px) {
		svg {
			right: 5%
		}
	}
	@media (max-width: 1600px) {
		svg {
			right: 3%
		}
	}
	@media (max-width: 1450px) {
		svg {
			right: 1%
		}
	}
	@media (max-width: 1350px) {
		width: 55%;
		svg {
			left: 35%
		}
	}
`;