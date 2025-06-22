import { type User } from "@/assets/Types/Types";
import { Input } from "@/components/shadcn-ui/input";

import type { RootState } from "../../../store/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { editUser } from "../../../features/userSlice/UserSlice";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { Link } from "react-router";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const myUser = useSelector((state: RootState) => state.user.user);
  const [newUser, setNewUser] = useState<User>(
    myUser ?? {
      name: "",
      lastName: "",
      profilePic: "",
      motto: "",
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  function handlePicChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Mi assicuro che il file non sia nulla
      setNewUser({
        ...newUser,
        profilePic: URL.createObjectURL(file),
      });
    } else {
      //Se null, imposto immagine di default
      setNewUser({
        ...newUser,
        profilePic: "https://placehold.co/400",
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(editUser(newUser));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profilePic">Foto Profilo:</label>
        <Input
          type="file"
          name="profilePic"
          id="profilePic"
          alt="Insert profile image"
          placeholder="Insert profile image"
          accept="image/"
          onChange={handlePicChange}
        />

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
      <Link to="/profile">
        <Button variant={"outline"}>Home</Button>
      </Link>
    </>
  );
}
