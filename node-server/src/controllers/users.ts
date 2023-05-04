import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/users.js";
import { userLoginSchema, userRegisterSchema } from "../validator.js";

export async function createOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("createOne: [POST] /users");

  const { full_name, email, password } = req.body;

  const { error } = userRegisterSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorObj = new Error(JSON.stringify(error));
    res.status(400);
    next(errorObj);
  }

  try {
    const alreadyExistsUser = await User.findOne({ where: { email } });

    if (alreadyExistsUser) {
      const error = new Error("User with provided email already exists!");
      res.status(409);
      next(error);
    }
  } catch (error) {
    console.log("ERROR in createOne", error);
    next(error);
  }

  const USER_MODEL = {
    full_name: full_name,
    email: email,
    password: bcrypt.hashSync(password, 10),
  };

  try {
    const savedUser = await User.create(USER_MODEL);
    const { password, ...userData } = savedUser;

    return res.status(201).json({ success: true, payload: { user: userData } });
  } catch (error) {
    console.log("ERROR in createOne", error);
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  console.log("login: [POST] /users/login");

  const { email, password } = req.body;

  const { error } = userLoginSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorObj = new Error(JSON.stringify(error));
    res.status(400);
    next(errorObj);
  }

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      const error = new Error("User not found!");
      res.status(400);
      next(error);
    }

    if (!bcrypt.compareSync(password, user.dataValues.password)) {
      const error = new Error(
        "Invalid email or password. Please try again with the correct credentials."
      );
      res.status(400);
      next(error);
    }

    const accessToken = generateJWT({
      id: user.dataValues.id,
      email: user.dataValues.password,
      full_name: user.dataValues.full_name,
      secret: process.env.ACCESS_JWT_SECRET,
      expiresIn: "1h",
    });

    const refreshToken = generateJWT({
      id: user.dataValues.id,
      email: user.dataValues.password,
      full_name: user.dataValues.full_name,
      secret: process.env.REFRESH_JWT_SECRET,
      expiresIn: "1d",
    });

    // Assigning refresh token in http-only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ success: true, payload: { accessToken, refreshToken } });
  } catch (error) {
    console.log("ERROR in login", error);
    next(error);
  }
}

export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("deleteOne: [DELETE] /users/:id");

  const token = req.headers["x-access-token"];

  try {
    await User.destroy({ where: { id: req.params.id } });

    jwt.sign(token, "", { expiresIn: 1 }, (logout, errorMessage) => {
      if (logout) {
        return res.status(200).json({
          sucess: true,
          payload: { message: "You have been Logged Out" },
        });
      } else {
        const error = new Error(errorMessage);
        res.status(404);
        next(error);
      }
    });
  } catch (error) {
    console.log("ERROR in deleteOne", error);
    next(error);
  }
}

export async function getAll(_: Request, res: Response, next: NextFunction) {
  console.log("getAll: [GET] /users");

  try {
    const users = await User.findAll();

    return res.status(200).json({ success: true, payload: { users } });
  } catch (error) {
    console.log("ERROR in getAll", error);
    next(error);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  console.log("getOne: [GET] /users/:id");
  try {
    const user = await User.findByPk(req.params.id);

    return res.status(200).json({ success: true, payload: { user } });
  } catch (error) {
    console.log("ERROR in getOne", error);
    next(error);
  }
}

interface GenerateJWT {
  id: string;
  email: string;
  full_name: string;
  secret: string;
  expiresIn: string;
}

function generateJWT({ id, email, full_name, secret, expiresIn }: GenerateJWT) {
  return jwt.sign(
    {
      id,
      email,
      full_name,
    },
    secret,
    { expiresIn }
  );
}
