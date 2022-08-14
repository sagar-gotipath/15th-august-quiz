import { DefaultSeo } from "next-seo";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        title="আসুন জানি - ১৫ আগস্ট"
        description="১৫ আগস্ট সম্পর্কে জানতে এবং জানাতে ভিজিট করুন"
        openGraph={{
          title: "আসুন জানি - ১৫ আগস্ট",
          description: "১৫ আগস্ট সম্পর্কে জানতে এবং জানাতে ভিজিট করুন",
          images: [
            {
              url: "/assets/images/banner.jpg",
              width: 1200,
              height: 627,
              alt: "banner",
              type: "image/jpeg",
            },
          ],
          site_name: "আসুন জানি - ১৫ আগস্ট",
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
