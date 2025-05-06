import Link from "next/link";

export default function LogoNav() {
	return (
		<Link
			href="/"
			aria-label="home button"
			className="font-logo text-xl text-primary hover:scale-105 hover:text-primary transition-all duration-300 flex-grow md:flex-grow-0 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
		>
			Promptr
		</Link>
	);
}
