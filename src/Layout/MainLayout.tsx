import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link, Outlet } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { FaReact } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import viteLogo from '/vite.svg'

const LayoutPublic = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex-grow">
        <Sidebar open={open} setOpen={setOpen} />
        <main className={`${open ? "ml-72" : "ml-16"} duration-500`}>
          <Outlet />
        </main>
      </div>
      <footer className="bg-black py-8 text-center mt-10 text-white text-lg">
        <p>
          Designed by
          <Link
            to="https://github.com/JBryan98"
            target="_blank"
            className="font-semibold hover:font-bold"
          >
            {" JBryan98 "}
          </Link>
          using
        </p>
        <div className="flex justify-center items-center gap-3 mt-1">
          <Link
            to="https://vitejs.dev/guide/"
            target="_blank"
            className="flex justify-center items-center gap-1 py-1 px-2 border-x border-white hover:border"
          >
            <FaReact className="inline-block text-[#61fbfb]" />
            <span className="font-bold"> React + </span>
            <img
              src={viteLogo}
              alt="vite_logo"
              className="h-5"
            />
            <span className="font-bold"> Vite</span>
          </Link>
          <span className="font-semibold">&</span>
          <Link
            to="https://spring.io/projects/spring-boot"
            target="_blank"
            className="flex justify-center items-center gap-1 py-1 px-2 border-x border-white hover:border"
          >
            <SiSpringboot className="inline-block text-[#6DB33F]" />
            <span className="font-bold"> Spring Boot</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LayoutPublic;
