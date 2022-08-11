import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiFacebook, FiLink, FiShare2, FiTwitch, FiTwitter } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'
import { appBaseUrl } from '../lib/config'

function SharePage({ children }) {
  const location = useLocation()

  const [hasNativeShare, setHasNativeShare] = useState(false)

  const pageUrl = appBaseUrl + location.pathname

  console.log(pageUrl)

  function copyURL() {
    window.navigator?.clipboard.writeText(pageUrl)
  }

  function openShareDialog() {
    window.navigator.share({
      title: document.title,
      text: document.title,
      url: pageUrl,
    })
  }

  useEffect(() => {
    setHasNativeShare(typeof navigator !== typeof undefined && typeof navigator.share !== typeof undefined)
  }, [])

  if (hasNativeShare) {
    return (
      <button type="button" className={''} onClick={openShareDialog}>
        {/* <FiShare2 className="w-5 h-5" />
        <span>Share</span> */}
        {children}
      </button>
    )
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={''}>
        <FiShare2 className="w-5 h-5" />
        <span>Share</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 flex p-4 mt-2 space-x-4 overflow-hidden origin-top-left bg-gray-900 divide-y divide-gray-700 rounded-md shadow-2xl ring-1 ring-black ring-opacity-6 focus:outline-none">
          <Menu.Item>
            <a
              title="Facebook"
              href={'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl}
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
              href={'https://twitter.com/intent/tweet?url=' + pageUrl}
              className="link"
              target="_blank"
              rel="noreferrer"
            >
              <FiTwitter className="w-6 h-6" />
            </a>
          </Menu.Item>
          <Menu.Item>
            <button title="Copy to Clipboard" className="cursor-pointer link" onClick={copyURL}>
              <FiLink className="w-6 h-6" />
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default SharePage
