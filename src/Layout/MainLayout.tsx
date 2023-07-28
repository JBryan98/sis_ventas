import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Footer } from "../components/Footer";

const LayoutPublic = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <div className="flex-grow">
        <Sidebar open={open} setOpen={setOpen} />
        <main className={`${open ? "ml-72" : "ml-16"} duration-500`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutPublic;
