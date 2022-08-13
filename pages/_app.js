import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            {/* <DefaultSeo
                openGraph={{
                    type: "website",
                    locale: "en_IE",
                    url: "https://www.url.ie/",
                    site_name: "15th august quiz",
                }}
            /> */}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
