import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="w-full flex justify-evenly items-center gap-4 absolute bottom-8 right-1/2 translate-x-1/2">
      <Link
        to={"/"}
        className="rounded-full bg-secondary p-2 px-4 hover:bg-primary hover:text-secondary content-center h-full"
      >
        Tasks
      </Link>

      <Link
        to={"/profile"}
        className="rounded-full bg-secondary p-2 px-4 hover:bg-primary hover:text-secondary content-center h-full "
      >
        Profilo
      </Link>
    </div>
  );
}
