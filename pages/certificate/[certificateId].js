import Link from "next/link";
import { NextSeo } from "next-seo";
import { collection, getDoc, query, where, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import CenterWrapper from "../../components/CenterWrapper";
import Certificate from "../../components/Certificate";
import { db } from "../../firebase.config";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";

const CertificatePage = ({ userData }) => {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <Spinner />
            </div>
        );
    }

    if (!userData) {
        return (
            <h1 className="py-10 font-semibold text-center">
                Something went wrong in server. Please try again later.
            </h1>
        );
    }

    if (userData) {
        return (
            <>
                <NextSeo
                    title="15th august quiz"
                    description="A quiz event about father of nation Sheikh Mujibur Rahman and his contribution to Bangladesh. Organized by Gotipath and Deepto TV"
                    canonical="https://www.canonical.ie/"
                    openGraph={{
                        url: "https://www.url.ie/a",
                        title: "15th August Quiz Event",
                        description:
                            "A quiz event about father of nation Sheikh Mujibur Rahman and his contribution to Bangladesh. Organized by Gotipath and Deepto TV",
                        images: [
                            {
                                url: userData?.imageUrl,
                                width: 1200,
                                height: 627,
                                alt: "Quiz Certificate",
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
                            src={userData?.imageUrl}
                            className="max-w-[646px] max-h-[460px] h-auto object-cover mx-auto block mb-10"
                        />
                        <div className="flex justify-center">
                            <Link href="/">
                                <a>
                                    <Button>অংশগ্রহণ করুন</Button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </CenterWrapper>
            </>
        );
    }
};

export default CertificatePage;

export async function getStaticProps({ params }) {
    console.log(params);
    if (!params.certificateId) {
        return {
            props: {
                userData: null,
            },
            notFound: true,
        };
    }
    const docRef = doc(db, "users", params.certificateId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return {
            props: {
                userData: docSnap.data(),
            },
        };
    }
    return {
        props: {
            userData: null,
        },
        notFound: true,
    };
}

export function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}
