import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

export default function UserControls() {
	return (
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
	);
}
