import Link from "next/link";
import Container from "./ui/container";
import MainNav from "./main-nav";
import NavbarAction from "./navbar-action";

export const revalidate = 0;
const Navbar = async () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative flex items-center px-4 sm:px-6 lg:px-8 h-16">
          <Link href="/" className="flex gap-x-2 ml-4 lg:ml-0">
            <p className="font-bold text-xl">Store</p>
          </Link>
          <MainNav />
          <NavbarAction />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
