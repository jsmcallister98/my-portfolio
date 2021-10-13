import styled, { css } from "styled-components";

export const sharedTransition = css`
	transition-duration: var(--transition-duration);
	transition-property: color, background-color;
	transition-timing-function: linear;
`;