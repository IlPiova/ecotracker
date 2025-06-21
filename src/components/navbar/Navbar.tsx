import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="flex justify-around items-center gap-4 rounded-xl w-max fixed bottom-8 right-[50%] translate-1/2">
      <Link to={"/"} className="rounded-full bg-secondary p-2">
        Tasks
      </Link>
      <Link to={"/profile"} className="rounded-full bg-secondary p-2">
        Profile
      </Link>
    </div>
  );
}
