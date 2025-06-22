import type { RootState } from "@/store/Store";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div className="flex justify-around items-center gap-4 rounded-xl w-max h-12 absolute bottom-8 right-[50%] translate-1/2">
      <Link
        to={"/"}
        className="rounded-full bg-secondary p-2 hover:bg-primary hover:text-secondary"
      >
        Tasks
      </Link>
      <Link to={"/profile"} className="rounded-full bg-secondary p-2 h-full">
        {user.profilePic ? (
          <img
            src={user.profilePic}
            className=" h-full rounded-full object-cover"
          />
        ) : (
          "Profile"
        )}
      </Link>
    </div>
  );
}
