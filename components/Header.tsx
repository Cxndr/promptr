import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import MobileNav from "./MobileNav";
import MainNav from "./DesktopNav";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center w-full absolute top-0 left-0 p-4">
      <div className="flex flex-row">
        <MainNav />
        <MobileNav />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

      <div className="flex flex-row">
      </div>
    </header>
  );
};

export default Header;
