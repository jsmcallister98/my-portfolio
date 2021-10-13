
import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext, cloneElement } from "react";
import {
	FaGithub,
	FaTwitter,
	FaStackOverflow,
	FaLinkedin,
	FaEnvelope,
	FaSteam,
	FaRedditAlien,
	FaSpotify,
	FaDiscord,
} from "react-icons/fa";
import { FiRss, FiSun, FiMenu, FiX } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";
import styled, { css, ThemeContext } from "styled-components";

import Logo from "./Logo";
import { IconContainer } from "src/components/Blog";
import { sharedTransition } from "src/components/General";
import { LinkTo } from "src/styles/typography";
import { useBreakpointRange, useHasMounted } from "src/utils/hooks";
import { breakpoint } from "src/utils/style";
import { iTheme } from "src/pages";

export const HIDE_NAVBAR_PAGES = ["fancy-pants"];
export const checkIfNavbarShouldBeHidden = (path: string) => HIDE_NAVBAR_PAGES.includes(path);

export const Navbar = () => {
	const [isNavbarShown, setIsNavbarShown] = useState(true);
	const hasMounted = useHasMounted();
	const { pathname } = useRouter();

	useEffect(() => {
		setIsNavbarShown(!checkIfNavbarShouldBeHidden(pathname.slice(1)));
	}, [pathname]);

	if (!hasMounted) return <Header />;

	return isNavbarShown ? (
		<Header>
			<HeaderInner>
				<Link href="/" passHref>
					<IconContainer tabIndex={0}>
						<title>Home</title>
						<Logo />
					</IconContainer>
				</Link>
				<NavbarMenu />
			</HeaderInner>
		</Header>
	) : null;
};

const variants: Variants = {
	open: { opacity: 1, transition: { staggerChildren: 0.1 } },
	closed: { opacity: 0 },
};

const textLinksVariants: Variants = {
	open: { x: 0, opacity: 1 },
	closed: { x: "-100%", opacity: 0 },
};

const iconLinksVariants: Variants = {
	open: { opacity: 1 },
	closed: { opacity: 0 },
};

const NavLinks = () => {
	return (
		<Nav>
			<PageLinks>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/about">about</NavLink>
				</motion.li>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/projects">projects</NavLink>
				</motion.li>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/blog">blog</NavLink>
				</motion.li>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/contact">contact</NavLink>
				</motion.li>
			</PageLinks>
			<IconLinks>
				<motion.li variants={iconLinksVariants}>
					<IconContainer
						href="https://github.com/jsmcallister98"
						target="_blank"
						rel="noopener noreferrer"
						$styledOnHover
					>
						<FaGithub aria-label="My GitHub" title="My GitHub" />
					</IconContainer>
				</motion.li>
				<motion.li variants={iconLinksVariants}>
					<IconContainer
						href="https://www.linkedin.com/in/jacob-mcallister-50a18b174/"
						target="_blank"
						rel="noopener noreferrer"
						$styledOnHover
					>
						<FaLinkedin aria-label="My LinkedIn" title="My LinkedIn" />
					</IconContainer>
				</motion.li>
			</IconLinks>
		</Nav>
	);
};

const DesktopNavLinks = () => {
	return (
		<FlexNavs>
			<FlexNavLinks>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/about">about</NavLink>
				</motion.li>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/projects">projects</NavLink>
				</motion.li>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/blog">blog</NavLink>
				</motion.li>
				<motion.li variants={textLinksVariants}>
					<NavLink href="/contact">contact</NavLink>
				</motion.li>
			</FlexNavLinks>
			<FlexNavLinks>
				<motion.li className="nav-icon" variants={iconLinksVariants}>
					<IconContainer
						href="https://github.com/jsmcallister98"
						target="_blank"
						rel="noopener noreferrer"
						$styledOnHover
					>
						<FaGithub aria-label="My GitHub" title="My GitHub" />
					</IconContainer>
				</motion.li>
				<motion.li className="nav-icon" variants={iconLinksVariants}>
					<IconContainer
						href="https://www.linkedin.com/in/jacob-mcallister-50a18b174/"
						target="_blank"
						rel="noopener noreferrer"
						$styledOnHover
					>
						<FaLinkedin aria-label="My LinkedIn" title="My LinkedIn" />
					</IconContainer>
				</motion.li>
			</FlexNavLinks>
		</FlexNavs>
	);
};

const NavbarMenu = () => {
	const [darkTheme, setDarkTheme] = useState<boolean | undefined>(undefined);
	const { theme } = useContext(ThemeContext);
	const [showDrawer, setShowDrawer] = useState(false);
	const [isMobileLayout, setIsMobileLayout] = useState<boolean | undefined>(undefined);
	const { asPath } = useRouter();

	const handleMobileOnEnter = () => {
		setIsMobileLayout(true);
	};

	const handleMobileOnLeave = () => {
		setIsMobileLayout(false);
	};

	useBreakpointRange({ to: "lg" }, { onEnter: handleMobileOnEnter, onLeave: handleMobileOnLeave });

	useEffect(() => {
		const root = window.document.documentElement;
		const initialColorValue: iTheme = root.style.getPropertyValue(
			"--initial-color-mode"
		) as iTheme;
		setDarkTheme(initialColorValue === "dark");
	}, []);

	useEffect(() => {
		if (darkTheme !== undefined) {
			if (darkTheme) {
				document.documentElement.setAttribute("data-theme", "dark");
				window.localStorage.setItem("theme", "dark");
			} else {
				document.documentElement.removeAttribute("data-theme");
				window.localStorage.setItem("theme", "light");
			}
		}
	}, [darkTheme]);

	useEffect(() => {
		if (theme) setDarkTheme(theme === "dark");
	}, [theme]);

	useEffect(() => {
		const handleKeyboardDarkModeToggle = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === "l" && event.shiftKey && event.metaKey) {
				event.preventDefault();
				setDarkTheme(!darkTheme);
			}
		};
		window.addEventListener("keydown", handleKeyboardDarkModeToggle);

		return () => {
			window.removeEventListener("keydown", handleKeyboardDarkModeToggle);
		};
	}, [darkTheme]);

	useEffect(() => {
		setShowDrawer(false);
		document.body.style.removeProperty("overflow");
	}, [asPath]);

	const handleThemeSwitch = (event: React.MouseEvent) => {
		event.preventDefault();
		setDarkTheme(!darkTheme);
	};

	const handleToggleDrawer = () => {
		setShowDrawer((showDrawer) => {
			const nextState = !showDrawer;

			if (nextState === true) {
				document.body.style.overflow = "hidden";
			} else {
				// Re-enable scrolling once menu is closed
				document.body.style.removeProperty("overflow");
			}

			return nextState;
		});
	};

	return (
		<AnimatePresence>
			<NavContainer $showDrawer={showDrawer} key="navigation">
				<NavLinksDesktop>
					<DesktopNavLinks />
				</NavLinksDesktop>
				<ThemeSwitch className="theme-switch" onClick={handleThemeSwitch}>
					{darkTheme === undefined ? (
						<div style={{ width: "25px" }} />
					) : darkTheme ? (
						<IoMdMoon aria-label="Switch to Light Mode" title="Switch to Light Mode" />
					) : (
						<FiSun aria-label="Switch to Dark Mode" title="Switch to Dark Mode" />
					)}
				</ThemeSwitch>
				<MobileMenuToggle
					onClick={handleToggleDrawer}
					aria-label={showDrawer ? "Close menu" : "Open menu"}
				>
					{showDrawer ? (
						<FiX aria-label="Open menu" title="Open menu" />
					) : (
						<FiMenu aria-label="Open menu" title="Open menu" />
					)}
				</MobileMenuToggle>
			</NavContainer>
			<FullScreenWrapper
				key="mobile-navigation"
				aria-label="mobile-navigation"
				visible={showDrawer}
				variants={variants}
				initial="closed"
				animate={showDrawer ? "open" : "closed"}
				transition={{ type: "spring", stiffness: 180, damping: 20 }}
			>
				<NavLinks />
			</FullScreenWrapper>
		</AnimatePresence>
	);
};

const FlexNavs = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

const FlexNavLinks = styled.div`
	padding: 0 1rem;
	list-style: none;
	display: flex;
	align-items: center;
	li {
		padding: 0 1rem;
	}
`;

const Container = styled.div`
	display: grid;
	grid-auto-flow: column;
	width: 100%;
	grid-template-columns: 1fr;
`;

const PlatformLinksContainer = styled(Container)`
	${breakpoint.until.lg(css`
		display: flex;
		flex-wrap: wrap;
		padding: 0 3rem;
	`)}
`;

const NavLink = styled(LinkTo)`
	border: none !important;
	color: var(--color-primary);
	&:hover {
		color: var(--color-primary-accent);
	}
`;

const ThemeSwitch = styled(IconContainer).attrs({ as: "button" })`
	&.theme-switch {
		width: 35px;
		margin-left: auto;
		margin-right: 10px;
		${breakpoint.from.lg(css`
			margin-right: auto;
			margin-left: 0;
		`)}
	}
`;

const MobileMenuToggle = styled(IconContainer).attrs({ as: "button" })`
	color: var(--color-primary-accent);
	${breakpoint.from.lg(css`
		display: none;
	`)}
`;

const Header = styled.header`
	position: fixed;
	z-index: 10;
	top: 0;
	width: 100%;
	height: calc(40px + 2rem);
	padding: 0 1rem;
	background-color: transparent;
	${sharedTransition}
	${IconContainer}, ${ThemeSwitch}, ${MobileMenuToggle} {
		z-index: 10;
	}
`;

const HeaderInner = styled.div`
	padding: 2rem 1rem;
	margin: 0 auto;
	width: 100%;
	max-width: var(--max-width);
	display: grid;
	grid-template-columns: max-content auto;
	align-content: center;
	gap: 2rem;
`;

const Nav = styled.nav`
	display: contents;
	padding-right: 2rem;
	width: min-content;
`;

const navLinksMixin = css`
	display: grid;
	list-style: none;
	${breakpoint.from.lg(css`
		display: contents;
	`)}
`;

const PageLinks = styled.ul`
	${navLinksMixin}
`;

const IconLinks = styled.ul`
	${navLinksMixin}
	${breakpoint.until.lg(css`
		grid-auto-flow: column;
		gap: 2rem;
		/* padding: 0.5rem 1rem; */
		width: min-content;
	`)}
	& > li {
		padding: 0;
	}
`;

const NavLinksDesktop = styled.div`
	display: none;
	${breakpoint.from.lg(css`
		display: contents;
	`)}
`;

const FullScreenWrapper = styled(motion.div)<{ visible: boolean }>`
	height: 100vh;
	width: 98vw;
	background-color: var(--color-bg-blurred);
	position: absolute;
	top: 0;
	left: 0;
	display: grid;
	align-content: center;
	${({ visible }) =>
		visible
			? css`
					pointer-events: auto;
					width: 100vw;
			  `
			: css`
					pointer-events: none;
			  `}
	${Nav} {
		display: grid;
		gap: 2rem;
		& > ${PageLinks}, ${IconLinks} {
			padding-left: 3rem;
			font-size: 1.5rem;
			width: min-content;
		}
		& > ${PageLinks} > li {
			padding: 0.5rem 0;
		}
	}
	${breakpoint.from.lg(css`
		display: none;
	`)}
`;

const NavContainer = styled(motion(Container))<{ $showDrawer: boolean }>``;

type TExternalLinksArray = Array<{
	link: string;
	title: string;
	icon: JSX.Element;
}>;
export const ExternalLinksOverlay = () => {
	const externalLinks: TExternalLinksArray = [
		{
			link: "https://twitter.com/_Sreet.lgas",
			title: "Sreetam Das' GitHub",
			icon: <FaGithub />,
		},
		{
			link: "https://twitter.com/_Sreet.lgas",
			title: "Sreetam Das' Twitter",
			icon: <FaTwitter />,
		},
		{
			link: "https://stackoverflow.com/users/5283213",
			title: "Sreetam Das' StackOverflow",
			icon: <FaStackOverflow />,
		},
		{
			link: "https://www.linkedin.com/in/sreet.lgas",
			title: "Sreetam Das' LinkedIn",
			icon: <FaLinkedin />,
		},
		{
			link: "mailto:sreetam@sreet.lgas.com",
			title: "Send email to Sreetam Das",
			icon: <FaEnvelope />,
		},
		{
			link: "https://steamcommunity.com/id/karmanaut007",
			title: "Sreetam Das' Steam",
			icon: <FaSteam />,
		},
		{
			link: "https://giphy.com/gifs/LrmU6jXIjwziE/tile",
			title: "Sreetam Das' Reddit",
			icon: <FaRedditAlien />,
		},
		{
			link: "https://open.spotify.com/user/22nkuerb2tgjpqwhy4tp4aecq",
			title: "Sreetam Das' Spotify",
			icon: <FaSpotify />,
		},
		{
			link: "https://srtm.fyi/ds",
			title: "Join Sreetam Das' Discord server",
			icon: <FaDiscord />,
		},
	];

	const IconWithProps = ({ icon, title }: { icon: JSX.Element; title: string }) =>
		cloneElement(icon, { title });

	return (
		<PlatformLinksContainer>
			{externalLinks.map(({ link, title, icon }) => (
				<IconContainer
					href={link}
					title={title}
					key={title}
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconWithProps {...{ icon, title }} />
				</IconContainer>
			))}
		</PlatformLinksContainer>
	);
};