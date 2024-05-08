"use client";
import React, { useEffect, useState } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  LinkedinIcon,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const SocialShareLinks = () => {
    const [link,setLink] = useState('');
    useEffect(() => {
        setLink(window.location.href)
    },[]);
  return (
    <div className="social-share">
      <p style={{ margin: "5px 0", fontSize: ".9rem" }}>Share this post</p>
      <FacebookShareButton
        url={link}
        hashtag={"adlist"}
        title="I am sharing this awesome post from egbontech"
      >
        <FacebookIcon size={30} />
      </FacebookShareButton>
      <TwitterShareButton
        url={link}
        title="I am sharing this awesome post from egbontech"
        hashtags={["egbontech", "adlist"]}
      >
        <XIcon size={30} />
      </TwitterShareButton>
      <WhatsappShareButton
        url={link}
        title="I am sharing this awesome post from egbontech"
      >
        <WhatsappIcon size={30} />
      </WhatsappShareButton>
      <LinkedinShareButton
        url={link}
        title="I am sharing this awesome post from egbontech"
      >
        <LinkedinIcon size={30} />
      </LinkedinShareButton>
    </div>
  );
};

export default SocialShareLinks;
