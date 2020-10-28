import React from "react";
import { NormalButton } from "@Components/atoms/Button";
import { BoldText } from "@Components/atoms/Typography";

const Footer: React.FC = () => {
  const moveToProfile = () => {
    const url = "https://yopinoji.info";
    window.open(url, "_blank");
  };
  const moveToGitHub = () => {
    const url = "https://github.com/yopinoji/yopinoji.com";
    window.open(url, "_blank");
  };
  const moveToTop = () => {
    window.location.href = window.location.origin;
  };

  return (
    <footer>
      <div className="py-28 flex flex-col items-center">
        <NormalButton onClick={moveToProfile}>
          View Author&apos;s Profile.
        </NormalButton>
        <NormalButton onClick={moveToGitHub}>View on GitHub.</NormalButton>
        <NormalButton onClick={moveToTop}>Back to Top Page.</NormalButton>
        <BoldText>{"© YopiNoji. All Rights Reserved."}</BoldText>
      </div>
    </footer>
  );
};

export default Footer;
