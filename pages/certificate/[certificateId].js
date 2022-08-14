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
                    title="আসুন জানি - ১৫ই আগস্ট"
                    description="বঙ্গবন্ধু সম্পর্কে জানতে ও জানাতে ভিজিট করুন"
                    canonical="https://www.canonical.ie/"
                    openGraph={{
                        url: "https://www.url.ie/a",
                        title: "আসুন জানি - ১৫ই আগস্ট",
                        description:
                            "বঙ্গবন্ধু সম্পর্কে জানতে ও জানাতে ভিজিট করুন",
                        images: [
                            {
                                url: userData?.imageUrl,
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
                ></NextSeo>

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
