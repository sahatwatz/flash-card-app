import React from "react";
import frog from "../../public/dance-frog.gif";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center mb-10">
      <img
        src={frog}
        alt="frog"
        title="frog is dancing!"
        className="h-12 w-12 opacity-50 mb-4"
      />
      <h1 className="font-serif text-sm text-tahiti opacity-10">
        Built by{" "}
        <a
          className="opacity-80 hover:opacity-100 "
          href="https://sahatwatz.vercel.app/"
          title="heading to my website!"
        >
          Sahatwatz
        </a>
      </h1>
      <h2 className="font-serif text-xs text-tahiti opacity-10">
        <span className="font-serif">&copy;</span> 2025 V.0.5
      </h2>
    </footer>
  );
};

export default Footer;
