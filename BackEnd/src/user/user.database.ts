import { UnitUser, Users } from "./user.interface";
import bcrypt from "bcryptjs";
import { v4 as random } from "uuid";
import fs from "fs";

let users: Users = loadUsers();

function loadUsers(): Users {
  try {
    const data = fs.readFileSync("./users.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error ${error}`);
    return {};
  }
}

function saveUsers() {
  try {
    fs.writeFileSync("./users.json", JSON.stringify(users), "utf-8");
    console.log(`User saved successfully!`);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

export const findAll = async (): Promise<UnitUser[]> => Object.values(users);

export const findOne = async (id: string): Promise<UnitUser> => users[id];

export const create = async (userData: UnitUser): Promise<UnitUser | null> => {
  try {
    let id = random();

    let check_user = await findOne(id);

    while (check_user) {
      id = random();
      check_user = await findOne(id);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser: UnitUser = { ...userData, id, password: hashedPassword };

    users[id] = newUser;

    saveUsers();

    return newUser;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    return null;
  }
};
