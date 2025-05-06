import { FaRegCopyright } from "react-icons/fa6";

const Footer: React.FC = async () => {
	return (
		<footer className="flex flex-row gap-1 flex-nowrap justify-center items-center w-full py-2 text-xs bg-background shadow-md shadow-themeshadow">
			<p>Promptr</p>
			<FaRegCopyright />
			<p>2025</p>
		</footer>
	);
};

export default Footer;
