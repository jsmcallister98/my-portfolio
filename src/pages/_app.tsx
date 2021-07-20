import { AppProps } from "next/app";
import Head from "next/head";
import React, { Fragment, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import 'src/components/Animations/Golf/Golfer.scss'
import { Navbar } from "src/components/Navbar/Navbar";
// import { FoobarWrapper } from "components/foobar";
import { sharedTransition } from "src/styles/components";
// import { Layout } from "styles/layouts";
import { TGlobalThemeObject } from "src/typings/styled";
import { BASE_FONT_SIZE } from "src/utils/style";

// import "assets/fonts/iosevka/iosevka.css";

const GlobalStyles = createGlobalStyle`
	:root {
	--color-primary: rgb(0, 0, 0);
	--color-background: rgb(255, 255, 255);
	--color-inlineCode-fg: var(--color-primary);
	--color-inlineCode-bg: rgb(220, 220, 220);
	--values-primary-accent: 91, 52, 218;
	--color-primary-accent: rgb(91, 52, 218);
	--color-secondary-accent: rgb(53, 142, 241);
	--color-fancy-pants: var(--color-primary-accent);
	--font-family-code: Iosevka Web, SFMono-Regular, Consolas, Roboto Mono, Menlo, Monaco,
		Liberation Mono, Lucida Console, monospace;
	--color-success-accent: rgb(0, 255, 127);
	--color-success-accent-faded: rgba(0, 255, 127, 0.19);
	--color-danger-accent: rgb(255, 128, 0);
	--color-danger-accent-faded: rgba(255, 128, 0, 0.2);
	--color-info-accent: rgb(0, 191, 255);
	--color-info-accent-faded: rgba(0, 191, 255, 0.27);
	--color-error: rgb(255, 0, 0);
	--color-bg-blurred: rgba(255,255,255,0.93);
	--max-width: 1200px;
	--border-radius: 5px;
	--transition-duration: 0.1s;
	--color-pants: #36353d;
	}
	[data-theme="dark"] {
		--color-primary-accent: rgb(157, 134, 233);
		--values-primary-accent: 157, 134, 233;
		--color-secondary-accent: #7567f5;
		--color-primary: rgb(255, 255, 255);
		--color-background: hsl(210deg, 30%, 8%);
		--color-inlineCode-bg: rgb(51, 51, 51);
		--color-bg-blurred: rgba(15,10,35,0.9);
		--color-pants: #77778c;
	}
	[data-theme="batman"] {
		--color-primary-accent: rgb(255, 255, 0);
		--values-primary-accent: 255, 255, 0;
		--color-secondary-accent: rgb(97, 218, 251);
		--color-primary: rgb(255, 255, 255);
		--color-background: rgb(0, 0, 0);
		--color-inlineCode-bg: rgb(34, 34, 34);
	}
	html,
	body {
		font-size: ${BASE_FONT_SIZE}px;
		font-family: -apple-system, BlinkMacSystemFont, Inter, Roboto, Segoe UI,
			Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
			sans-serif;
		color: var(--color-primary);
		background-color: var(--color-background);
		margin: 0;
		line-height: 1.5;
		${sharedTransition}
	}
	*, *:before, *:after {
		box-sizing: border-box;
	}
	:not(pre):not(span)::selection {
		background: rgba(var(--values-primary-accent), 0.99);
		color: var(--color-background)
	}
	:focus:not(:focus-visible) {
		outline: 0;
	}
	:focus-visible {
		box-shadow: 0 0 0.1rem 0.1rem var(--color-primary-accent);
		opacity: 1;
		outline: 0;
	}
	h1,
	h2,
	h3,
	h4 {
		margin: 0;
		padding-top: 2rem;
	}
	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.5rem;
	}
	a {
		text-decoration: none;
		color: var(--color-primary-accent);
		cursor: pointer;
		&:visited {
			text-decoration: none;
		}
		&:hover {
			text-decoration: underline;
		}
	}
	code,
	pre {
		font-family: var(--font-family-code);
		font-size: 0.85em;
	}
	code {
		background-color: var(--color-inlineCode-bg);
		padding: 0.2em;
		border-radius: 3px;
		/* prevent our code block from being broken into different sections on linebreak
			https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break */
		box-decoration-break: clone;
		white-space: nowrap;
		${sharedTransition}
	}
`;

type TThemeObjectInitial = Pick<TGlobalThemeObject, "theme">;
const initTheme = {
	theme: undefined,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [themeObject, setThemeObject] = useState<TThemeObjectInitial>(initTheme);

	const getCSSVarValue = (variable: string) => {
		if (typeof window !== "undefined")
			return getComputedStyle(document.body).getPropertyValue(variable);
		return undefined;
	};
	const changeThemeVariant: TGlobalThemeObject["changeThemeVariant"] = (theme) => {
		setThemeObject({ theme });
	};
	const themeForContext: TGlobalThemeObject = {
		...themeObject,
		getCSSVarValue,
		changeThemeVariant,
	};

	return (
		<Fragment>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ThemeProvider theme={themeForContext}>
				<GlobalStyles />
				{/* <FoobarWrapper> */}
					<Navbar />
					{/* <Layout> */}
						<Component {...pageProps} />
					{/* </Layout> */}
				{/* </FoobarWrapper> */}
			</ThemeProvider>
		</Fragment>
	);
};

export default MyApp;