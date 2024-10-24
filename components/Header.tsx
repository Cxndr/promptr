import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header: React.FC = () => {
  return (
    <header className="flex flex-row flex-nowrap justify-evenly w-screen absolute top-0 left-0 pt-4 pb-4">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;
