import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";
import MainNav from "./DesktopNav";
import { ModeToggle } from "./ModeToggle";

const Header: React.FC = () => {
  return (
    <header className="fixed w-full h-12 px-6 bg-background z-20 shadow-md shadow-black">
      <div className="flex justify-between items-center h-full w-full ">
        <div className="flex flex-row">
          <MainNav />
          <MobileNav />
        </div>

        <div className="flex gap-4 items-center">
          <div className="">
            <ModeToggle />
          </div>

          <div className="flex items-center hover:scale-110 transition-all duration-300">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
