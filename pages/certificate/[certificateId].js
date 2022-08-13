import Link from "next/link";
import { NextSeo } from "next-seo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import CenterWrapper from "../../components/CenterWrapper";
import Certificate from "../../components/Certificate";
import { db } from "../../firebase.config";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

const CertificatePage = ({ userData }) => {
    const router = useRouter();

    console.log(userData);

    if (router.isFallback) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <Spinner />
            </div>
        );
    }

    if (userData === null) {
        return (
            <h1 className="py-10 font-semibold text-center">
                Something went wrong in server. Please try again later.
            </h1>
        );
    }

    return (
        <>
            <NextSeo
                title="15th august quiz"
                description="A quiz about father of nation Sheikh Mujibur Rahman life and Bangladesh history organized by Gotipath and Deepto TV"
                canonical="https://www.canonical.ie/"
                openGraph={{
                    url: "https://www.url.ie/a",
                    title: "Open Graph Title",
                    description: "Open Graph Description",
                    images: [
                        {
                            url: userData?.imageUrl,
                            width: 646,
                            height: 460,
                            alt: "Og Image Alt",
                            type: "image/jpeg",
                        },
                    ],
                    site_name: "15th august quiz",
                }}
                twitter={{
                    handle: "@handle",
                    site: "@site",
                    cardType: "summary_large_image",
                }}
            ></NextSeo>
            {/* <NextSeo
                additionalMetaTags={[
                    {
                        property: "og:description",
                        content:
                            "One of top performer who participate in the quiz.",
                    },
                    {
                        property: "og:image",
                        content:
                            "https://gotipath.com/wp-content/uploads/2021/04/gotipath-og.png",
                    },
                    {
                        property: "og:title",
                        content: "15th august quiz",
                    },
                ]}
            ></NextSeo> */}
            <CenterWrapper>
                <img
                    src="/assets/images/mujib.png"
                    alt="mujib logo"
                    className="block w-24 mx-auto mb-8"
                />
                <div>
                    <img
                        src={userData.imageUrl}
                        className="max-w-[646px] max-h-[460px] h-auto object-cover mx-auto block mb-10"
                    />
                    <Link href="/">
                        <a>
                            <Button>অংশগ্রহণ করুন</Button>
                        </a>
                    </Link>
                </div>
            </CenterWrapper>
        </>
    );
};

export default CertificatePage;

export async function getStaticProps({ params }) {
    if (params.certificateId === "testingcertificateid") {
        return {
            props: {
                userData: null,
            },
        };
    }

    try {
        const userRef = collection(db, "users");

        // console.log(userRef);
        const certificateQuery = query(
            collection(db, "users"),
            where("uid", "==", params.certificateId)
        );

        const certificateSanpShot = await getDocs(certificateQuery);

        let certificate = "";
        certificateSanpShot.forEach((doc, index) => {
            const document = doc.data();
            certificate = document;
        });

        const data = certificate || null;

        console.log(data);
        return {
            props: {
                userData: data,
            },
        };
    } catch (error) {
        console.log(error);
    }
}

export function getStaticPaths() {
    return {
        paths: [{ params: { certificateId: "testingcertificateid" } }],
        fallback: true,
    };
}
