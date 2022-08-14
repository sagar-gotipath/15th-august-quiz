import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  FiFacebook,
  FiLink,
  FiShare2,
  FiTwitch,
  FiTwitter,
} from "react-icons/fi";
import { appBaseUrl } from "../lib/config";
import { useRouter } from "next/router";

function SharePage({ children, pageUrl }) {
  const router = useRouter();
  const [hasNativeShare, setHasNativeShare] = useState(false);

  // const pageUrl = appBaseUrl + "banner" + path;

  console.log(pageUrl);

  function copyURL() {
    window.navigator?.clipboard.writeText(pageUrl);
  }

  function openShareDialog() {
    window.navigator.share({
      title: document.title,
      text: document.title,
      url: pageUrl,
    });
  }

  useEffect(() => {
    setHasNativeShare(
      typeof navigator !== typeof undefined &&
        typeof navigator.share !== typeof undefined
    );
  }, []);

  if (hasNativeShare && getOS() !== "Windows") {
    return (
      <button type="button" className={""} onClick={openShareDialog}>
        {children}
      </button>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 flex p-4 mt-2 space-x-4 overflow-hidden origin-top-left bg-gray-100 divide-y divide-gray-200 rounded-md shadow-2xl ring-1 ring-black ring-opacity-6 focus:outline-none">
          <Menu.Item>
            <a
              title="Facebook"
              href={"https://www.facebook.com/sharer/sharer.php?u=" + pageUrl}
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              <FiFacebook className="w-6 h-6" />
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              title="Twitter"
              href={"https://twitter.com/intent/tweet?url=" + pageUrl}
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
          </Menu.Item>
          <Menu.Item>
            <button
              title="Copy to Clipboard"
              className="cursor-pointer link"
              onClick={copyURL}
            >
              <FiLink className="w-6 h-6" />
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default SharePage;

function getOS() {
  var userAgent = window.navigator.userAgent,
    platform =
      window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
    windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
    iosPlatforms = ["iPhone", "iPad", "iPod"],
    os = null;
  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "Mac OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "iOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "Windows";
  } else if (/Android/.test(userAgent)) {
    os = "Android";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
  }
  return os;
}
