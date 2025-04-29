import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("GET all Users");
});

userRouter.get("/:id", (req, res) => {
  res.send("GET a single user");
});

userRouter.post("/", (req, res) => {
  res.send("CREATE a new user");
});

userRouter.put("/:id", (req, res) => {
  res.send("UPDATE user");
});

userRouter.delete("/:id", (req, res) => {
  res.send("DELETE user");
});

export default userRouter;
