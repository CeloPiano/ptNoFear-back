import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../src/prisma/prisma.service';
import * as cookieParser from 'cookie-parser';

describe('App (e2e)', () => {
  let app: INestApplication;
  let authService: AuthService;
  let instanceSuperTest: request.SuperAgentTest;
  let access_token: string;
  let cookies: string;
  let user: CreateUserDto = {
    googleId: '112345683233214050543',
    name: 'John Doe',
    picture: null,
  };

  beforeAll(async () => {
    jest.setTimeout(20000);
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        AuthService,
        UserService,
        JwtService,
        ConfigService,
        PrismaService,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    authService = moduleRef.get<AuthService>(AuthService);
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();

    jest
      .spyOn(authService, "parseGoogleIdToken")
      .mockImplementation((_token) => {
        return Promise.resolve(user);
      });

    instanceSuperTest = request.agent(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });
  
  it('/auth/google (POST) - should return 200', async () => {
    const { status, body, header } = await instanceSuperTest
      .post('/auth/google')
      .send({
        token: 'token',
      });

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        expires_in: expect.any(Number),
        user: {
          googleId: expect.any(String),
          id: expect.any(Number),
          isAdmin: expect.any(Boolean),
          name: expect.any(String),
          picture: null,
        },
      }),
    );
    expect(header['set-cookie']).toEqual(
      expect.arrayContaining([expect.any(String)]),
    );

    cookies = header['set-cookie'][0];
  });
  
  it('/auth/refresh (GET) - should return 200', async () => {
    const { status, body } = await instanceSuperTest
      .get('/auth/refresh')
      .set('Cookie', cookies);

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        expires_in: expect.any(Number),
      }),
    );

    access_token = body.access_token;
  });

  it('/users/:id (PATCH) - should return 200', async () => {
    const { status, body } = await instanceSuperTest
      .patch('/users/1')
      .set('Authorization', `Bearer ${access_token}`);

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({
        isAdmin: expect.any(Boolean),
      }),
    );
  });

  it('/users (GET) - should return 200', async () => {
    const { status, body } = await instanceSuperTest.get('/users');

    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
          isAdmin: expect.any(Boolean),
        }),
      ]),
    );
  });

  it('/auth/logout (POST) - should return 401', async () => {
    const { status } = await instanceSuperTest.post('/auth/logout');

    expect(status).toBe(401);
  });

  it('/auth/logout (POST) - should return 200', async () => {
    const { status } = await instanceSuperTest
      .post('/auth/logout')
      .set('Authorization', `Bearer ${access_token}`);
    expect(status).toBe(200);
  });
});