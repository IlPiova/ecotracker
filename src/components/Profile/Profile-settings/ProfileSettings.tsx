import { type User } from "@/assets/Types/Types";
import { Input } from "@/components/shadcn-ui/input";

import type { RootState } from "../../../store/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editUser } from "../../../features/userSlice/UserSlice";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/shadcn-ui/button";

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(editUser(newUser));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
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

        <Button variant={"default"} type="submit">
          Save
        </Button>
      </form>
    </>
  );
}
