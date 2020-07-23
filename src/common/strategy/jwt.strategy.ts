import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtConstants } from "../jwt/constants";
import { UsersService } from "src/modules/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userSerivce: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        })
    }

    async validate(payload: any) {
        const user = await this.userSerivce.findOne(payload.username);
        return user;
        // return { userId: payload.sub, username: payload.username };
    }
}