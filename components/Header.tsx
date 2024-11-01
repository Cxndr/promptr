import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import UserControls from "./UserControls";
import LogoNav from "./LogoNav";

const Header: React.FC = () => {
	return (
		<header className="fixed w-full h-12 px-4 bg-background z-40 shadow-md shadow-themeshadow transition-colors duration-1000">
			<div className="flex-grow flex justify-center items-center h-full w-full ">
				<MobileNav />
				<LogoNav />

				<div className="flex md:justify-center flex-grow">
					<DesktopNav />
				</div>

				<UserControls />
			</div>
		</header>
	);
};

export default Header;
