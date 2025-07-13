import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import Navbar from "../navbar/Navbar";
import ProfileSettings from "./ProfileSettings";

import "../../index.css";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);
  const lists = useSelector((state: RootState) => state.lists.lists);

  return (
    <>
      <div className=" m-auto w-[80%] p-4 gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-3xl font-extrabold">
            {user?.name} {user?.lastName}
          </h2>
          <p className="italic font-light">{user?.motto}</p>
          <h3 className="text-2xl font-bold self-start">My lists:</h3>
          <ul className="self-start">
            {lists.map((list, i) => (
              <li key={i}>{list}</li>
            ))}
          </ul>
        </div>

        <div className="w-fit text-center bg-primary mb-28 rounded-lg text-secondary p-4 justify-self-center absolute bottom-4 left-1/2 translate-x-[-50%]">
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
