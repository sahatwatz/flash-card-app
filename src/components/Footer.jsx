import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center">
      <h1 className="font-serif text-sm text-tahiti opacity-50">
        Built by{" "}
        <a
          className="opacity-80 hover:opacity-100 "
          href="https://sahatwatz.vercel.app/"
        >
          Sahatwatz
        </a>
      </h1>
      <h2 className="font-serif text-xs text-tahiti opacity-50">
        <span className="font-serif">&copy;</span> 2025 V.0.5
      </h2>
    </footer>
  );
};

export default Footer;
