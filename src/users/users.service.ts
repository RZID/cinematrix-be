import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoginDto } from './dto/login.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserOnJWT } from './decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { MoviesService } from 'src/movies/movies.service';
import moviesConstant from 'src/constants/movies.constant';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly movieService: MoviesService,
  ) {}
  async register(registerDto: RegisterDto) {
    try {
      await this.prismaService.user.create({
        data: {
          name: registerDto.name,
          password: await argon2.hash(registerDto.password),
          username: registerDto.username,
          role: registerDto.role === 1 ? 'ADMIN' : undefined,
          Group: {
            connectOrCreate: {
              where: {
                id: registerDto.groupId,
              },
              create: {
                id: registerDto.groupId,
              },
            },
          },
        },
      });

      if (
        registerDto.role === 1 &&
        (await this.prismaService.user.count({
          where: {
            groupId: registerDto.groupId,
          },
        })) === 1
      )
        if (
          !(await this.prismaService.movie.count({
            where: {
              groupId: registerDto.groupId,
            },
          }))
        )
          await this.movieService.createMany(
            moviesConstant,
            await this.prismaService.user.findFirst({
              where: {
                groupId: registerDto.groupId,
              },
            }),
          );

      return { message: 'Account created successfully' };
    } catch (e) {
      if (
        e instanceof PrismaClientKnownRequestError &&
        (e as PrismaClientKnownRequestError).code === 'P2002'
      )
        throw new BadRequestException('This credential already taken');

      console.error(e);
      throw new InternalServerErrorException(
        'An error occurred on server-side',
      );
    }
  }

  async login(loginDto: LoginDto) {
    const notMatch = 'User is not registered or wrong password';
    try {
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: {
          username: loginDto.username,
        },
      });

      if (await argon2.verify(user.password, loginDto.password))
        return {
          access_token: this.jwtService.sign({
            sub: user.uid,
            role: user.role,
            username: user.username,
            groupId: user.groupId,
          }),
        };
      throw new BadRequestException(notMatch);
    } catch (e) {
      if (
        e instanceof PrismaClientKnownRequestError &&
        (e as PrismaClientKnownRequestError).code === 'P2025'
      )
        throw new BadRequestException(notMatch);

      if (e.response) throw e;

      throw new InternalServerErrorException(
        'An error occurred on server-side',
      );
    }
  }

  getMe(user: UserOnJWT) {
    try {
      if (user.uid) {
        const userData = this.prismaService.user.findUniqueOrThrow({
          where: {
            uid: user.uid,
          },
          select: {
            name: true,
            role: true,
            username: true,
            groupId: true,
          },
        });

        return userData;
      }
      throw new Error();
    } catch (e) {
      const ePrisma: PrismaClientKnownRequestError = e;

      if (
        e instanceof PrismaClientKnownRequestError &&
        ePrisma.code === 'P2025'
      )
        throw new UnauthorizedException();

      throw new InternalServerErrorException(
        'An error occurred on server-side',
      );
    }
  }

  update(updateUserDto: UpdateUserDto, user: UserOnJWT) {
    return this.prismaService.user.update({
      where: {
        uid: user.uid,
        groupId: user.groupId,
      },
      data: {
        name: updateUserDto.name,
      },
    });
  }
}
