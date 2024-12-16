import userModel, { IUser } from "../models/userModel";
import { IAddUserDto, ILoginUserDto, IUserResDto } from "../types/dto/userDto";
import ErrorResponse from "../utils/ErrorResponse";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const addUser = async (userDto: IAddUserDto): Promise<IUserResDto> => {
  checkCredentials<IAddUserDto>(userDto, ["username", "email", "password"]);

  // check if username already exist
  if (await userModel.findOne({ username: userDto.username }))
    throw new ErrorResponse("username already taken", 409);

  // check if email already exist
  if (await userModel.findOne({ email: userDto.email }))
    throw new ErrorResponse("email already taken", 409);

  // hash password
  const hashedPassword = await bcrypt.hash(userDto.password, SALT_ROUNDS);
  const added = await userModel.create({ ...userDto, password: hashedPassword });
  const { password, ...userWithoutPassword } = added.toObject();

  return userWithoutPassword as IUserResDto;
};

export const authenticate = async (userDto: ILoginUserDto): Promise<IUserResDto> => {
  checkCredentials<ILoginUserDto>(userDto, ["email", "password"]);

  const user: IUser | undefined | null = await userModel.findOne({
    email: userDto.email,
  });

  if (!user || !(await bcrypt.compare(userDto.password, user.password)))
    throw new ErrorResponse("invalid credentials", 401);

  return createUserResDto(user);
};

function checkCredentials<T extends object>(dto: T, requiredFields: (keyof T)[]): void {
  if (!dto) throw new ErrorResponse("Missing credentials", 400);

  // Check if all required fields are present and have valid values
  for (const field of requiredFields) {
    if (!(field in dto)) {
      throw new ErrorResponse(`Missing field: ${String(field)}`, 400);
    }
    if (dto[field] === null || dto[field] === undefined) {
      throw new ErrorResponse(`Missing or invalid value for field: ${String(field)}`, 400);
    }
  }
}

export const createUserResDto = (user: IUser): IUserResDto => {
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword as IUserResDto;
};
