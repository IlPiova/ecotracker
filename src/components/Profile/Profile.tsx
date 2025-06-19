import { Link } from "react-router";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4">
        <Avatar>
          <AvatarImage src={user?.profilePic} />
          <AvatarFallback>{user?.name}</AvatarFallback>
        </Avatar>
        <p className="text-3xl font-extrabold">
          {user?.name} {user?.lastName}
        </p>
      </div>
      <Link to={"/profile/settings"}>
        <Button variant={"secondary"}>Edit profile</Button>
      </Link>

      <Link to={"/"}>
        <Button variant={"outline"}>Home</Button>
      </Link>
    </>
  );
}
