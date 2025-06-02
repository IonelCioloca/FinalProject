import React from "react";

const SocialShare = ({ title }) => {
  const pageUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(title);

  const handleFacebookShare = (e) => {
    e.preventDefault();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}&quote=${encodedTitle}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleTwitterShare = (e) => {
    e.preventDefault();
    const url = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${encodedTitle}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const handleCopyLink = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="social-share-wrapper">
      <div className="social-share">
        <ul>
          <li>
            <a
              href="#"
              onClick={handleTwitterShare}
              className="twitter-share-btn"
            >
              <span>Share this page on X</span>
              <img src="/x.png" alt="X" />
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={handleFacebookShare}
              className="facebook-share-btn"
            >
              <span>Share this page on Facebook</span>
              <img src="/facebook.png" alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="#" onClick={handleCopyLink} className="copy-link-btn">
              <span>Copy this page's link</span>
              <img src="/copy.png" alt="Copy" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SocialShare;
