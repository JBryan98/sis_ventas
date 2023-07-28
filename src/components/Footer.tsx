import { FaReact } from "react-icons/fa"
import { SiSpringboot } from "react-icons/si"
import { Link } from "react-router-dom"
import viteLogo from '/vite.svg'

export const Footer = () => {
  return (
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
  )
}
