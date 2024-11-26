import Logo from "/Logo.png";
import { Link } from "react-router-dom";

const EmptyHead = () => {
  return (
    <div className="bg-primary-blue flex w-full min-h-12 p-4 md:p-0 md:py-4 md:px-8 justify-between items-center">
      {/* Logo */}
      <Link to={"/"}>
        <img src={Logo} alt="Nourasense" className={"h-8 w-auto"} />
      </Link>
    </div>
  );
};

export default EmptyHead;
