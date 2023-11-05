import Bottombar from "@/components/shared/Bottombar";
import Leftbar from "@/components/shared/Leftbar";
import Topbar from "@/components/shared/Topbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <Leftbar />

      <section className="h-full flex flex-1">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};
export default RootLayout;
