import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/users/guards/jwt.guard';
import { RoleGuard } from 'src/users/guards/role.guard';
import { HasRoles } from 'src/users/decorators/permission.decorator';
import { Role } from '@prisma/client';
import {
  OrderByFindMany,
  OrderMethodFindMany,
} from './dto/find-many-movie.dto';
import { GetUser, UserOnJWT } from 'src/users/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('Movies')
@Controller('movies')
@UseGuards(JwtGuard, RoleGuard)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({
    summary: 'Create Movie',
    description:
      '<div><h1>Create Movie</h1><p>This route is for creating a new movie. It expects certain information about the movie to be sent in a specific format, such as the title, description (which is optional), rating, release date, and media (like images or videos). The information about the movie is sent in a JSON format to the server. Once received, the server checks if the user sending the request has the role of an administrator. If they do, it proceeds to create the movie using the provided information. If not, it returns an error message.</p></div>',
  })
  @HasRoles(Role.ADMIN)
  @Post()
  @ApiBody({
    type: CreateMovieDto,
    examples: {
      a: {
        summary: 'Create Movie Example',
        value: {
          title: 'Laskar Pelangi',
          description:
            'Laskar Pelangi adalah novel pertama karya Andrea Hirata yang diterbitkan oleh Bentang Pustaka pada tahun 2005. Novel ini bercerita tentang kehidupan 10 anak dari keluarga miskin yang bersekolah (SD dan SMP) di sebuah sekolah Muhammadiyah di Belitung yang penuh dengan keterbatasan.',
          rating: 5.0,
          media: [
            {
              fileUrl:
                'https://upload.wikimedia.org/wikipedia/id/8/8e/Laskar_pelangi_sampul.jpg',
              altName: 'Cover laskar pelangi',
              isBanner: true,
              type: 'PHOTO',
            },

            {
              fileUrl:
                'https://www.youtube.com/embed/8ZYOqARRTng?si=6gA5MCx-DwK6WeB0',
              altName: 'Trailer laskar pelangi',
              isBanner: false,
              type: 'VIDEO',
            },
          ],
        } as CreateMovieDto,
      },
    },
  })
  create(@Body() createMovieDto: CreateMovieDto, @GetUser() user: UserOnJWT) {
    return this.moviesService.create(createMovieDto, user);
  }

  @ApiOperation({
    summary: 'Find Many Movie',
    description:
      '<div><h1>Find Many Movie</h1><p>This route is for finding many movies based on certain criteria. Users can search for movies using parameters such as title, page, limit, orderBy, and orderMethod. The information is sent to the server in a query format. The server then returns a list of movies that match the specified criteria. Users with either admin or user roles can access this route.</p></div>',
  })
  @HasRoles(Role.ADMIN, Role.USER)
  @Get()
  @ApiQuery({
    name: 'page',
    description: 'Page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Limit',
    required: false,
  })
  @ApiQuery({
    name: 'orderBy',
    description: 'orderBy',
    required: false,
    enum: OrderByFindMany,
  })
  @ApiQuery({
    name: 'orderMethod',
    description: 'orderMethod',
    required: true,
    enum: OrderMethodFindMany,
  })
  @ApiQuery({
    name: 'title',
    description: 'title',
    required: false,
  })
  findAll(
    @GetUser()
    user: UserOnJWT,
    @Query('title') title?: string,
    @Query('orderMethod')
    orderMethod: OrderMethodFindMany = OrderMethodFindMany.desc,
    @Query('orderBy') order?: OrderByFindMany,
    @Query('page') page: number | undefined = 1,
    @Query('limit') limit: number | undefined = 10,
  ) {
    return this.moviesService.findAll(
      user,
      orderMethod,
      order,
      page,
      limit,
      title,
    );
  }

  @ApiOperation({
    summary: 'Find One Movie',

    description:
      '<div><h1>Find One Movie</h1><p>This route is for finding a single movie by its unique identifier (uid). Users with either admin or user roles can access this route. The server receives the unique identifier from the request and returns the details of the corresponding movie if it exists.</p></div>',
  })
  @HasRoles(Role.USER, Role.ADMIN)
  @Get(':uid')
  findOne(@Param('uid') uid: string, @GetUser() user: UserOnJWT) {
    return this.moviesService.findOne(uid, user);
  }

  @ApiOperation({
    summary: 'Update Movie',
    description:
      "<div><h1>Update Movie</h1><p>This route is for updating an existing movie. Only users with an admin role can access this route. The server expects the unique identifier (uid) of the movie to be updated along with the updated information in a specific format. Once received, the server verifies the user's role and proceeds to update the movie details accordingly.</p></div>",
  })
  @ApiBody({
    type: CreateMovieDto,
    examples: {
      a: {
        summary: 'Create Movie Example',
        value: {
          title: 'Laskar Pelangi',
          description:
            'Laskar Pelangi adalah novel pertama karya Andrea Hirata yang diterbitkan oleh Bentang Pustaka pada tahun 2005. Novel ini bercerita tentang kehidupan 10 anak dari keluarga miskin yang bersekolah (SD dan SMP) di sebuah sekolah Muhammadiyah di Belitung yang penuh dengan keterbatasan.',
          rating: 5.0,
          releaseDate: '2008-09-25 00:00:00.000',
          media: [
            {
              fileUrl:
                'https://upload.wikimedia.org/wikipedia/id/8/8e/Laskar_pelangi_sampul.jpg',
              altName: 'Cover laskar pelangi',
              isBanner: true,
              type: 'PHOTO',
            },

            {
              fileUrl:
                'https://www.youtube.com/embed/8ZYOqARRTng?si=6gA5MCx-DwK6WeB0',
              altName: 'Trailer laskar pelangi',
              isBanner: false,
              type: 'VIDEO',
            },
          ],
        } as CreateMovieDto,
      },
    },
  })
  @HasRoles(Role.ADMIN)
  @Patch(':uid')
  update(
    @Param('uid') uid: string,
    @Body() updateMovieDto: CreateMovieDto,
    @GetUser() user: UserOnJWT,
  ) {
    return this.moviesService.update(uid, updateMovieDto, user);
  }

  @ApiOperation({
    summary: 'Remove Movie',
    description:
      "<div><h1>Remove Movie</h1><p>This route is for removing an existing movie from the database. Only users with an admin role can access this route. The server expects the unique identifier (uid) of the movie to be removed. Once received, the server verifies the user's role and proceeds to remove the movie from the database if it exists.</p></div>",
  })
  @HasRoles(Role.ADMIN)
  @Delete(':uid')
  remove(@Param('uid') uid: string, @GetUser() user: UserOnJWT) {
    return this.moviesService.remove(uid, user);
  }
}
