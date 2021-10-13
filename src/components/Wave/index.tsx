import styled from "styled-components";

export const WaveSVG = () => {
	return (
		<svg preserveAspectRatio="none" width="1440" height="74" viewBox="0 0 1440 74" className="Hero__Swoops-sc-13y35jq-4 bMVQrx">
    		<path fill="var(--color-background)" d="M456.464 0.0433865C277.158 -1.70575 0 50.0141 0 50.0141V74H1440V50.0141C1440 50.0141 1320.4 31.1925 1243.09 27.0276C1099.33 19.2816 1019.08 53.1981 875.138 50.0141C710.527 46.3727 621.108 1.64949 456.464 0.0433865Z"></path>
		</svg>
	)
}

export const Wave = styled.div`
	height: 500px;
	position: relative;
	background: linear-gradient( 
		0deg,
		hsla(200deg, 100%, 85%, 0.1),
		hsla(200deg, 100%, 85%, 0) );
	    background-color: #42378f;
    background-image: linear-gradient(
		180deg, 
		var(--header-dark) 10%, 
		var(--header-light) 99%);
}
	svg {
		overflow: hidden;
		display: block;
		position: absolute;
		left: 0px;
		right: 0px;
		bottom: 0px;
		width: 100%;
		height: 180px;
		transform: translateY(1px);
		z-index: 0;
	}
`;