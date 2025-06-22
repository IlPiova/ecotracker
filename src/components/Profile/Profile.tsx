// import { Link } from "react-router";
// import { Button } from "../shadcn-ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "../shadcn-ui/avatar";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import Navbar from "../navbar/Navbar";
import ProfileSettings from "./Profile-settings/ProfileSettings";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <div className="flex flex-col justify-between items-center h-full">
        <div className="flex flex-col justify-center items-center gap-4">
          <Avatar>
            <AvatarImage src={user?.profilePic} />
            <AvatarFallback>{user?.name}</AvatarFallback>
          </Avatar>
          <p className="text-3xl font-extrabold">
            {user?.name} {user?.lastName}
          </p>
          <p className="italic font-light">{user?.motto}</p>
        </div>

        <div className="w-[80%] text-center bg-primary mb-28 rounded-lg text-secondary p-4">
          <Popover>
            <PopoverTrigger>Edit profile</PopoverTrigger>
            <PopoverContent>
              <ProfileSettings />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Navbar />
    </>
  );
}
