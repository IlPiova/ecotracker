import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className=" flex justify-between items-center  gap-4 rounded-xl  w-full h-12 absolute bottom-8 right-[50%] translate-1/2">
      <Link
        to={"/"}
        className="rounded-full bg-secondary p-2 px-4 hover:bg-primary hover:text-secondary content-center h-full "
      >
        Tasks
      </Link>
      <Link
        to={"/profile"}
        className="rounded-full bg-secondary py-2 px-4 h-full hover:bg-primary hover:text-secondary content-center"
      ></Link>
    </div>
  );
}
