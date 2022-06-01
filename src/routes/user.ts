import express, { Request, Response, Router } from 'express';
import { User } from '../models/user';
import auth, { IntRequest } from '../middleware/auth';

const userRouter: Router = express.Router();

//create user
userRouter.post('/register', async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//login user
userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//logout user
userRouter.post('/logout', auth, async (req: IntRequest, res: Response) => {
  try {
    if (req.user) {
      req.user.tokens = req.user.tokens.filter((token: { token: string }) => {
        return token.token !== req.token;
      });
      await req.user.save();
    }

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

export { userRouter };
