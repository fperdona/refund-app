import { Link } from "react-router";
import Logo from "../assets/images/logo.svg?react";
import NavLink from "../core-components/nav-link";
import Button from "../core-components/button";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 gap-4">
      <Link to="/">
        <Logo className="h-8" />
      </Link>

      <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <NavLink href="/">
          Solicitações de reembolso
        </NavLink>
        <Link to="/novo" className="w-full md:w-40">
          <Button>Nova solicitação</Button>
        </Link>
      </nav>
    </header>
  );
}
