import { FaRegCopyright } from "react-icons/fa6";

const Footer: React.FC = async () => {
  return (
    <footer className="flex flex-row flex-nowrap justify-center items-center w-full fixed bottom-0 left-0 pt-1 pb-1 text-xs">
      <p>OnlyWords</p>
      <FaRegCopyright />
      <p>2024</p>
    </footer>
  );
};

export default Footer;
