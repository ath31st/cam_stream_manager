import type { PassportStatic } from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const jwtSecret = process.env.JWT_SECRET || 'secret';

export const configurePassport = (passport: PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      return done(null, jwt_payload);
    }),
  );
};
