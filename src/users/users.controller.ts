import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { GetUser, UserOnJWT } from './decorators/get-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'User Registration',
    description:
      '<div><h1>User Registration</h1><p>This route is for registering a new user. Users provide their registration details in a specific format, such as username, email, and password. Once received, the server processes the registration request and creates a new user account in the database.</p></div>',
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      a: {
        summary: 'User - Registration Example',
        value: {
          name: 'Siti Ningrum',
          username: 'siti_user',
          role: 0,
          groupId: 1000,
          password: 'Admin123-',
          confirmPassword: 'Admin123-',
        } as RegisterDto,
      },
      b: {
        summary: 'Admin - Registration Example',
        value: {
          name: 'Budi Setiawan',
          username: 'budi_admin',
          role: 1,
          groupId: 1000,
          password: 'Admin123-',
          confirmPassword: 'Admin123-',
        } as RegisterDto,
      },
    },
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @ApiOperation({
    summary: 'User Login',
    description:
      '<div><h1>User Login</h1><p>This route is for user authentication and login. Users provide their login credentials, such as username and password, in a specific format. Once received, the server validates the credentials and if they are correct, it generates and returns a JSON Web Token (JWT) to authenticate the user for subsequent requests.</p></div>',
  })
  @Post('login')
  @ApiBody({
    type: LoginDto,
    examples: {
      a: {
        summary: 'Login Example',
        value: {
          username: 'siti_user',
          password: 'Admin123-',
        } as LoginDto,
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Get Current User',
    description:
      '<div><h1>Get Current User</h1><p>This route is for retrieving information about the currently authenticated user. It requires a valid JSON Web Token (JWT) for authentication, which is typically included in the request headers. Once authenticated, the server retrieves the user details associated with the provided token and returns them.</p></div>',
  })
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: UserOnJWT) {
    return this.usersService.getMe(user);
  }

  @ApiOperation({
    summary: 'Update User Profile',
    description:
      '<div><h1>Update User Profile</h1><p>This route is for updating the profile information of the currently authenticated user. It requires a valid JSON Web Token (JWT) for authentication, which is typically included in the request headers. Once authenticated, the server allows the user to update their profile details, such as name, email, or any other relevant information.</p></div>',
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      a: {
        summary: 'Change Profile Example',
        value: {
          name: 'Asep',
        } as UpdateUserDto,
      },
    },
  })
  @UseGuards(JwtGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: UserOnJWT) {
    return this.usersService.update(updateUserDto, user);
  }
}
