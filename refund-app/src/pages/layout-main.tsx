import { Outlet } from "react-router";
import Header from "../components/header";

export default function LayoutMain() {
  return (
    <>
      <main className="relative p-3 flex gap-3 flex-col max-w-360 mx-auto">
        <Header />
        <div className="w-full p-4 md:px-28">
          <Outlet />
        </div>
      </main>
    </>
  );
}
