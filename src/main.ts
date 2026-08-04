import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HttpInterceptor } from './common/interceptors/http.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // cho phép gửi cookie/authorization header
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove unknown properties from the payload
      forbidNonWhitelisted: true, // Throw an error if unknown properties are found in the payload
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      transformOptions: { enableImplicitConversion: true }, // Automatically convert payloads to the required primitive types
    }),
  );

  //app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // Automatically serialize responses to DTOs
  app.useGlobalInterceptors(new HttpInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter()); // Handle HTTP exceptions

  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();
