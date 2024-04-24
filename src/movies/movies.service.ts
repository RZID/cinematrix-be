/* eslint-disable prefer-const */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  OrderByFindMany,
  OrderMethodFindMany,
} from './dto/find-many-movie.dto';
import { UserOnJWT } from 'src/users/decorators/get-user.decorator';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MoviesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createMovieDto: CreateMovieDto, user: UserOnJWT) {
    await this.prismaService.movie.create({
      data: {
        title: createMovieDto.title,
        description: createMovieDto.description,
        rating: createMovieDto.rating,
        Group: {
          connect: {
            id: user.groupId,
          },
        },
        releaseDate: new Date(createMovieDto.releaseDate),
        Media: {
          createMany: {
            data: createMovieDto.media.map((el) => ({
              fileUrl: el.fileUrl,
              altName: el.altName,
              isBanner: el.isBanner,
              type: el.type,
            })),
          },
        },
      },
    });

    return { message: 'This movie was successfully created' };
  }

  async createMany(createMovieDto: CreateMovieDto[], user: UserOnJWT) {
    return await this.prismaService.$transaction(async (tx) => {
      for (const movie of createMovieDto) {
        await tx.movie.create({
          data: {
            title: movie.title,
            description: movie.description,
            rating: movie.rating,
            groupId: user.groupId,
            releaseDate: new Date(movie.releaseDate),
            Media: {
              createMany: {
                data: movie.media.map((el) => ({
                  fileUrl: el.fileUrl,
                  altName: el.altName,
                  isBanner: el.isBanner,
                  type: el.type,
                })),
              },
            },
          },
        });
      }
    });
  }

  async findAll(
    user: UserOnJWT,
    orderMethodFindMany: OrderMethodFindMany,
    order?: OrderByFindMany,
    page?: number,
    limit?: number,
    name?: string,
  ) {
    const where: Prisma.MovieWhereInput = {
        title: {
          contains: name,
        },
        Group: {
          id: user.groupId,
        },
      },
      orderBy: Prisma.MovieOrderByWithAggregationInput = {
        [order || 'releaseDate']: orderMethodFindMany,
      },
      skip: number = (page || 1) > 1 ? (limit || 10) * (page - 1) : 0,
      take: number = limit || 10;

    const totalItems = await this.prismaService.movie.count({
      where: {
        groupId: user.groupId,
        ...where,
      },
    });

    return {
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / (limit || 10)) || 1,
        currentPage: page || 1,
      },
      data: await this.prismaService.movie.findMany({
        where,
        orderBy,
        skip,
        take,
        select: {
          uid: true,
          title: true,
          description: true,
          rating: true,
          releaseDate: true,
          Media: {
            where: {
              type: 'PHOTO',
              isBanner: true,
            },
            select: {
              type: true,
              fileUrl: true,
              altName: true,
            },
            take: 1,
          },
        },
      }),
    };
  }

  async findOne(uid: string, user: UserOnJWT) {
    return this.prismaService.movie
      .findUniqueOrThrow({
        where: {
          uid,
          groupId: user.groupId,
        },
        select: {
          uid: true,
          title: true,
          description: true,
          rating: true,
          releaseDate: true,
          Media: {
            select: {
              uid: true,
              type: true,
              fileUrl: true,
              altName: true,
              isBanner: true,
            },
          },
        },
      })
      .catch((e) => {
        const ePrisma: PrismaClientKnownRequestError = e;
        if (
          e instanceof PrismaClientKnownRequestError &&
          ePrisma.code === 'P2025'
        )
          throw new BadRequestException('This movie no longer exists');
      });
  }

  async update(uid: string, updateMovieDto: CreateMovieDto, user: UserOnJWT) {
    try {
      const createMovie = await this.prismaService.movie.update({
        where: {
          uid,
          groupId: user.groupId,
        },
        data: {
          title: updateMovieDto.title,
          description: updateMovieDto.description,
          rating: updateMovieDto.rating,
          Group: {
            connect: {
              id: user.groupId,
            },
          },
          releaseDate: new Date(updateMovieDto.releaseDate),
          Media: {
            deleteMany: {},
            createMany: {
              data: updateMovieDto.media.map((el) => ({
                fileUrl: el.fileUrl,
                altName: el.altName,
                isBanner: el.isBanner,
                type: el.type,
              })),
            },
          },
        },
      });

      return { message: 'This movie was successfully updated' };
    } catch (e) {
      const ePrisma: PrismaClientKnownRequestError = e;

      if (
        e instanceof PrismaClientKnownRequestError &&
        ePrisma.code === 'P2025'
      )
        throw new BadRequestException('This movie no longer exist');

      if (e.response) throw e;

      throw new InternalServerErrorException(
        'An error occurred on server-side',
      );
    }
  }

  async remove(uid: string, user: UserOnJWT) {
    try {
      const willDeleteMovie = await this.prismaService.movie.findFirstOrThrow({
        where: {
          uid,
          groupId: user.groupId,
        },
      });

      await this.prismaService.movieMedia.deleteMany({
        where: {
          movieId: willDeleteMovie.id,
        },
      });

      await this.prismaService.movie.delete({
        where: {
          id: willDeleteMovie.id,
        },
      });

      return { message: 'This movie was successfully removed' };
    } catch (e) {
      const ePrisma: PrismaClientKnownRequestError = e;
      if (
        e instanceof PrismaClientKnownRequestError &&
        ePrisma.code === 'P2025'
      )
        throw new BadRequestException('This movie no longer exists');

      if (e.response) throw e;

      console.error(e);
      throw new InternalServerErrorException(
        'An error occurred on server-side',
      );
    }
  }
}
