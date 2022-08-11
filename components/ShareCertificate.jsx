import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

const ShareCertificate = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/', { replace: true })
    }, 1000)
  }, [])

  return <></>
}

export default ShareCertificate
