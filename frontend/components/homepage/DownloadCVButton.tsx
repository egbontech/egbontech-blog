"use client";
import React from "react";

function DownloadCVButton() {
  const handleDownload = () => {
    const downloadUrl = "/assets/pdfs/cv.pdf";
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "Egbon-Eloghosa-CV.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return <button onClick={handleDownload}>Download CV</button>;
}

export default DownloadCVButton;
