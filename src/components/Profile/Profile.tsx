// import { Link } from "react-router";
// import { Button } from "../shadcn-ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import Navbar from "../navbar/Navbar";
import ProfileSettings from "./Profile-settings/ProfileSettings";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <div className="app-wrapper items-center justify-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-3xl font-extrabold">
            {user?.name} {user?.lastName}
          </p>
          <p className="italic font-light">{user?.motto}</p>
        </div>

        <div className="w-[80%] text-center bg-primary mb-28 rounded-lg text-secondary p-4 justify-self-center">
          <Popover>
            <PopoverTrigger>Edit profile</PopoverTrigger>
            <PopoverContent>
              <ProfileSettings />
            </PopoverContent>
          </Popover>
        </div>
        <Navbar />
      </div>
    </>
  );
}
