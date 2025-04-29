import React from "react";

const DownloadsEmbed = () => {
  return (
    <>
      <div className="w-full h-screen p-4">
        <iframe
          src="https://skillstation.github.io/downloads/"
          title="Downloads"
          className="w-full h-full border-0 rounded-xl shadow-lg"
          loading="lazy"
        />
      </div>
    </>
  );
};

export default DownloadsEmbed;
