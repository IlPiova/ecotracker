import { type User } from "@/assets/Types/Types";

import type { RootState } from "../../store/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editUser } from "../../features/userSlice/UserSlice";
import { addList } from "@/features/ListsSlice/ListsSlice";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Input } from "@/components/shadcn-ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn-ui/popover";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const myUser = useSelector((state: RootState) => state.user.user);

  const [newUser, setNewUser] = useState<User>(
    myUser ?? {
      name: "",
      lastName: "",
      motto: "",
    }
  );
  const [newListItem, setNewlistItem] = useState<{
    name: string;
    colour:
      | "red"
      | "orange"
      | "amber"
      | "yellow"
      | "green"
      | "blue"
      | "purple"
      | "pink";
  }>({ name: "", colour: "green" });

  function handleClickColourPicker(e: React.MouseEvent<HTMLDivElement>) {
    const targetElem = e.target as HTMLElement;
    if (targetElem.id) {
      setNewlistItem({
        ...newListItem,
        colour: targetElem.id as typeof newListItem.colour,
      });
    }
  }

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

  function ListColourPicker() {
    return (
      <div className="grid rows-2 gap-3" onClick={handleClickColourPicker}>
        <div id="red" className="rounded-full p-4 bg-red-500"></div>
        <div id="orange" className="rounded-full p-4 bg-orange-500"></div>
        <div id="amber" className="rounded-full p-4 bg-amber-500"></div>
        <div id="yellow" className="rounded-full p-4 bg-yellow-500"></div>
        <div
          id="green"
          className="row-start-2 rounded-full p-4 bg-green-500"
        ></div>
        <div
          id="blue"
          className="row-start-2 rounded-full p-4 bg-blue-500"
        ></div>
        <div
          id="purple"
          className="row-start-2 rounded-full p-4 bg-purple-500"
        ></div>
        <div
          id="pink"
          className="row-start-2 rounded-full p-4 bg-pink-500"
        ></div>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(editUser(newUser));
    dispatch(addList(newListItem));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-start align-center gap-3"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            name="name"
            id="name"
            alt="Insert user's name"
            placeholder="Insert user's name"
            value={newUser?.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            alt="Insert user's last name"
            placeholder="Insert user's last name"
            value={newUser?.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Your motto:</label>
          <Input
            type="text"
            name="motto"
            id="motto"
            alt="Insert user's motto"
            placeholder="Insert user's motto"
            value={newUser?.motto}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center items-center gap-3">
          {/* Nome lista */}
          <div className="flex-[35%]">
            <label htmlFor="list">Add new list:</label>
            <Input
              type="text"
              name="list"
              id="list"
              alt="Insert one new list"
              placeholder="Insert one new list"
              value={newListItem.name}
              onChange={(e) =>
                setNewlistItem({ ...newListItem, name: e.target.value })
              }
            />
          </div>
          {/* Colore nuova lista */}
          <div className="flex flex-col justify-center items-start ">
            <label>List colour:</label>
            <Popover>
              <PopoverTrigger className="p-1 border-input border-2 rounded-sm">
                <div
                  className={`rounded-full p-3 ${
                    listsColours[newListItem.colour]
                  }`}
                ></div>
              </PopoverTrigger>
              <PopoverContent>
                <ListColourPicker />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button variant={"default"} type="submit">
          Save
        </Button>
      </form>
    </>
  );
}
