import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';

export const attachUserFromToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return next();
  }

  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: JwtPayload) => {
      if (err || !user) {
        return next();
      }
      req.user = user;
      next();
    },
  )(req, res, next);
};
