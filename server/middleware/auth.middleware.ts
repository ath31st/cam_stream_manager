import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: JwtPayload) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Authentication failed', error: err });
      }
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};
