import {
	useState,
	useRef,
	useEffect,
	RefObject,
	createContext,
	PropsWithChildren,
	useCallback,
	ReactNode,
} from "react";

import { BREAKPOINTS, TBreakpoint } from "src/utils/style";

export const viewportContext = createContext({});

export const random = (min: number, max: number) => min + Math.random() * (max - min);

export const useHover: () => [RefObject<HTMLDivElement>, boolean] = () => {
	const [value, setValue] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);

	useEffect(() => {
		const node = ref.current;

		if (node) {
			node.addEventListener("mouseover", handleMouseOver);
			node.addEventListener("mouseout", handleMouseOut);

			return () => {
				node.removeEventListener("mouseover", handleMouseOver);
				node.removeEventListener("mouseout", handleMouseOut);
			};
		}
	}, []);

	return [ref, value];
};

type Delay = number | null;
type CallbackFn = (...args: unknown[]) => void;

/**
 * Provides a declarative useInterval
 *
 * @param callback - Function that will be called every `delay` ms.
 * @param delay - Number representing the delay in ms. Set to `null` to "pause" the interval.
 */
export const useInterval = (callback: CallbackFn, delay: Delay) => {
	const savedCallback = useRef<CallbackFn>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const handler: CallbackFn = (...args) => savedCallback.current?.(...args);

		if (delay !== null) {
			const intervalId = setInterval(handler, delay);
			return () => clearInterval(intervalId);
		}
	}, [delay]);
};

/**
 * Provides a declarative useTimeout
 *
 * @param callback - Function that will be called after `delay` ms.
 * @param delay - Number representing the delay in ms.
 */
export const useTimeout = (callback: CallbackFn, delay: Delay) => {
	const savedCallback = useRef<CallbackFn>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const handler: CallbackFn = (...args) => savedCallback.current?.(...args);

		if (delay !== null) {
			const id = setTimeout(handler, delay);
			return () => clearTimeout(id);
		}
	}, [delay]);
};

export const useHasMounted = () => {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);
	return hasMounted;
};

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";
const getInitialState = () => {
	// For our initial server render, we won't know if the user
	// prefers reduced motion, but it doesn't matter. This value
	// will be overwritten on the client, before any animations
	// occur.
	return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

export const usePrefersReducedMotion = () => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(QUERY);
		const listener = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(!event.matches);
		};

		mediaQueryList.addListener(listener);
		return () => {
			mediaQueryList.removeListener(listener);
		};
	}, []);

	return prefersReducedMotion;
};

export const useRandomInterval = (
	callback: () => void,
	minDelay: null | number,
	maxDelay: null | number
) => {
	const timeoutId = useRef<number | undefined>();
	const savedCallback = useRef(callback);
	useEffect(() => {
		savedCallback.current = callback;
	});
	useEffect(() => {
		if (typeof minDelay === "number" && typeof maxDelay === "number") {
			const handleTick = () => {
				const nextTickAt = random(minDelay, maxDelay);
				timeoutId.current = window.setTimeout(() => {
					savedCallback.current();
					handleTick();
				}, nextTickAt);
			};
			handleTick();
		}

		return () => window.clearTimeout(timeoutId.current);
	}, [minDelay, maxDelay]);
	const cancel = useCallback(function () {
		window.clearTimeout(timeoutId.current);
	}, []);
	return cancel;
};

export const ViewportProvider = ({ children }: PropsWithChildren<ReactNode>) => {
	const [width, setWidth] = useState(window?.innerWidth);
	const handleWindowResize = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);

		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	return <viewportContext.Provider value={{ width }}>{children}</viewportContext.Provider>;
};

const getBreakpointOrSize = (breakpoint: TBreakpoint | number) => {
	if (typeof breakpoint === "string") {
		return BREAKPOINTS[breakpoint];
	}
	return breakpoint;
};

type TUseBreakpointProps = (
	{ from, to }: { from?: TBreakpoint | number; to: TBreakpoint | number },
	{ onEnter, onLeave }: { onEnter: () => void; onLeave: () => void }
) => void;

/**
 * Detect viewport size and handle -changes
 * @param viewportSize the viewport range to be tracked
 * @param callbackFn handler functions to be executed when the viewport is entering/leaving that size
 */
export const useBreakpointRange: TUseBreakpointProps = ({ from = 0, to }, { onEnter, onLeave }) => {
	const [currentState, setCurrentState] = useState("");
	const fromSize = getBreakpointOrSize(from);
	const toSize = getBreakpointOrSize(to);

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;
			const withinFrom = screenWidth > fromSize;
			const withinTo = !toSize || screenWidth < toSize;
			const newState = `${withinFrom}-${withinTo}`;

			// Ensures it runs once on enter and once on leave
			if (currentState !== newState) {
				setCurrentState(newState);

				if (withinFrom && withinTo && onEnter) {
					onEnter();
				} else if (onLeave) {
					onLeave();
				}
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [fromSize, toSize, onEnter, onLeave, currentState, setCurrentState]);
};