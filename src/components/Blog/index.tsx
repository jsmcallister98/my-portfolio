import styled, { css } from "styled-components";
import { sharedTransition } from "src/components/General";
import { breakpoint } from "src/utils/style";

export const Card = styled.div`
	padding: 10px 0;
	cursor: pointer;
`;

export const StyledPre = styled.pre`
	background-color: var(--color-inlineCode-bg);
	margin: 0;
	padding: 15px;
	border-radius: var(--border-radius);
	font-size: 14px;
`;

export const IconContainer = styled.a<{ $styledOnHover?: boolean }>`
	font-size: 25px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	${({ $styledOnHover }) =>
		$styledOnHover
			? css`
					color: var(--color-primary);
					:hover {
						color: var(--color-primary-accent);
					}
			  `
			: css`
					color: var(--color-primary-accent);
			  `}
`;

export const LinkedHeaderIconWrapper = styled.a<{ isHovered: boolean }>`
	color: var(--color-primary-accent);
	position: absolute;
	transform: translateX(-125%) translateY(0.2rem);
	font-size: inherit;
	opacity: ${({ isHovered }) => (isHovered ? 0.75 : 0)};
	transition: opacity 200ms ease;
	${breakpoint.until.md(css`
		display: none;
	`)}
`;

export const CustomBlockquote = styled.aside<{ type?: string }>`
	padding: 20px;
	margin: 20px -20px 20px -25px;
	border-radius: var(--border-radius);
	${({ type }) =>
		type
			? `
				background-color: var(--color-${type}-accent-faded);
				border-left: 0.3em var(--color-${type}-accent) solid;
			  `
			: css`
					background-color: var(--color-info-accent-faded);
					border-left: 0.3em var(--color-info-accent) solid;
			  `}
`;

export const Highlight = styled.span`
	color: var(--color-primary-accent);
	font-style: italic;
	font-weight: bold;
`;

export const Button = styled.button`
	font-size: 18px;
	cursor: pointer;
	background-color: var(--color-background);
	padding: 10px 15px;
	border-radius: var(--border-radius);
	border: 2px solid var(--color-primary-accent);
	color: var(--color-primary);
	${sharedTransition}
	&:hover {
		background-color: var(--color-primary-accent);
		color: var(--color-background);
	}
`;
