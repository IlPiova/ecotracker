import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/Store";
import Navbar from "../navbar/Navbar";
import ProfileSettings from "./ProfileSettings";

import "../../index.css";

export default function Profile() {
  const user = useSelector((state: RootState) => state.user.user);
  const lists = useSelector((state: RootState) => state.lists.lists);

  const listsColours = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    amber: "bg-amber-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
  };

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
            {lists.map((list) => (
              <li
                key={list.id}
                className="flex justify-start items-center gap-2 mb-1"
              >
                <div
                  className={`rounded-full p-2 ${listsColours[list.colour]}`}
                ></div>
                <p>{list.name}</p>
              </li>
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
