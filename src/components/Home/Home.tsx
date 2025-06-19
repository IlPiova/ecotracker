import { useSelector } from "react-redux";
import { type RootState } from "@/store/Store";
import { Button } from "../ui/button";
import { Link } from "react-router";
export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      <h1>{user?.name}</h1>
      <Link to={"profile/settings"}>
        <Button variant={"secondary"}>Edit profile</Button>
      </Link>

      <Link to={"/"}>
        <Button variant={"outline"}>Home</Button>
      </Link>
    </>
  );
}
