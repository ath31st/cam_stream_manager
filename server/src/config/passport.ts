import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { PassportStatic } from 'passport';

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
