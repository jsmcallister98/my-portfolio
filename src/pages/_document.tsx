import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext, 
  DocumentInitialProps
} from "next/document";
import { ServerStyleSheet } from 'styled-components';

function setInitialColorMode() {
  function getInitialColorMode() {
    const preference = window.localStorage.getItem("theme");
    const hasExplicitPreference = typeof preference === "string";

    /**
     * If the user has explicitly chosen light or dark,
     * use it. Otherwise, this value will be null.
     */
    if (hasExplicitPreference) {
      return preference;
    }

    // If there is no saved preference, use a media query
    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);

    const hasImplicitPreference = typeof mql.matches === "boolean";
    if (hasImplicitPreference) {
      return mql.matches ? "dark" : "light";
    }

    // default to 'light'.
    return "light";
  }

  const colorMode = getInitialColorMode();
  const root = document.documentElement;
  root.style.setProperty("--initial-color-mode", colorMode);

  // add HTML attribute if dark mode
  if (colorMode === "dark")
    document.documentElement.setAttribute("data-theme", "dark");
  }

const blockingSetInitialColorMode = `(function() {
        ${setInitialColorMode.toString()}
        setInitialColorMode();
})()
`;

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
					{/* @ts-expect-error media isn't expected yet */}
					<meta name="theme-color" content="#5B34DA" media="(prefers-color-scheme: light)" />
					{/* @ts-expect-error media isn't expected yet */}
					<meta name="theme-color" content="#9D86E9" media="(prefers-color-scheme: dark)" />
					<link rel="apple-touch-icon" href="/logo.png" />
					<meta name="apple-mobile-web-app-title" content="Sreetam Das' Blog" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: blockingSetInitialColorMode,
            }}
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

