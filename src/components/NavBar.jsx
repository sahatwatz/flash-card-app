import React from "react";
import { Link } from "react-router";
import { HiPlusCircle } from "react-icons/hi";

const NavBar = () => {
  return (
    <div className="flex justify-center items-center">
      <nav className="w-1/2 flex justify-between items-center mt-4  max-sm:flex-col  max-sm:gap-8">
        <h1 className="text-white text-2xl  max-sm:text-4xl font-knewave-regular">
          <span className="text-yellow-200 text-4xl  max-sm:text-6xl">
            <b>F</b>
          </span>
          lashcard
        </h1>
        <ul className="text-white flex justify-center items-center gap-8">
          <li>
            <Link to="/">
              <a className="text-midnight font-mono bg-tahiti px-2 py-1 rounded-lg">
                <b>PLAY</b>
              </a>
            </Link>
          </li>
          <li>
            <Link to="/add-card">
              <HiPlusCircle className="h-8 w-8" title="Add New Flash Card" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
