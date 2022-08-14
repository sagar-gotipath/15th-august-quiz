import { DefaultSeo } from "next-seo";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <DefaultSeo
                title="আসুন জানি - ১৫ই আগস্ট"
                description="বঙ্গবন্ধু সম্পর্কে জানতে ও জানাতে ভিজিট করুন"
                canonical="https://www.canonical.ie/"
                openGraph={{
                    url: "https://www.url.ie/a",
                    title: "আসুন জানি - ১৫ই আগস্ট",
                    description: "বঙ্গবন্ধু সম্পর্কে জানতে ও জানাতে ভিজিট করুন",
                    images: [
                        {
                            url: "/assets/images/mujib.png",
                            width: 1200,
                            height: 627,
                            alt: "banner",
                            type: "image/jpeg",
                        },
                    ],
                    site_name: "আসুন জানি - ১৫ই আগস্ট",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
