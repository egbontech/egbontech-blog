import Link from 'next/link'
import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { FaSquareFacebook, FaSquareXTwitter } from 'react-icons/fa6'

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <section className="footer">
    <div className="social-icons">
      <Link href="https://facebook.com/egbontech/"target='_blank'>
        <FaSquareFacebook className="i" />
      </Link>
      <Link href="https://twitter.com/egbontech"target='_blank'>
        <FaSquareXTwitter className="i" />
      </Link>
      <Link href="https://www.linkedin.com/in/eloghosa-egbon-8a3991239/"target='_blank'>
        <FaLinkedin className="i" />
      </Link>
      <Link href="https://github.com/egbontech"target='_blank'>
        <FaGithub className="i" />
      </Link>
    </div>
    <p className='text'>Developed by <Link href="/">EgbonTech</Link> © {currentYear} All Rights Reserved</p>
  </section>
  )
}

export default Footer