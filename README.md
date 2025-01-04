## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Authentication 
Authentication is added globally, `JWTAuthGuard` on the `main.ts` it will intercept the token and `JwtStrategy` will verify the and pass the user & token info.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```
### EB

 
Replace my-nestjs-env with your desired environment name.
1. Initialize Elastic Beanstalk: Initialize your Elastic Beanstalk application.
`eb init`
2. Create Environment: Create an environment for your application.
`eb create my-nestjs-dev`
3. Deploy Application: Deploy your NestJS application to Elastic Beanstalk.
`eb deploy`
4. Set Environment Variables: Set environment variables for your application.
`eb setenv JWT_SECRET=your_jwt_secret DATABASE_URL=your_database_url`
Replace your_jwt_secret and your_database_url with your actual values.


## EB setup process 

I'll guide you through deploying a NestJS app on Elastic Beanstalk without Docker:

1. Initialize EB in your NestJS project:

```bash
eb init
# Select your region
# Choose Node.js platform
# Select Node.js 20
# Set up SSH if needed
```

2. Update `package.json` scripts:
```json
{
  "scripts": {
    "build": "nest build",
    "start": "node dist/main.js",
    "start:dev": "nest start --watch"
  },
  "engines": {
    "node": "20.x.x"
  }
}
```

3. Create `.ebextensions/nodecommand.config`:
```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeVersion: 20.11.0
  aws:elasticbeanstalk:application:environment:
    NODE_ENV: production
    NPM_USE_PRODUCTION: true
```

4. Create `.ebignore`:
```
node_modules
.git
.gitignore
.env.local
test
*.test.ts
README.md
```

5. Create a `Procfile`:

```sh
web: npm run start
```

6. Environment variables setup:
   - Create `.env.example` with your variables structure
   - Set up variables in EB Console or use:
```bash
eb setenv NODE_ENV=production DATABASE_URL=xxx
```

7. Create environment and deploy:
```bash
# Create new environment
eb create production-environment

# For subsequent deployments
eb deploy
```

8. Monitor your deployment:
```bash
eb status
eb health
eb logs
```

Common issues and solutions:

- If port binding fails, update `main.ts`:
```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8081);  // EB uses 8081 by default
}
```

- For CORS in production:
```typescript
app.enableCors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
});
```

- For database connections, use environment variables:
```typescript
TypeOrmModule.forRoot({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  // ...other config
})
```

Other commands 
1. ssh into commands
`eb ssh environment-name`
2. 
eb status
eb health
eb logs


<!-- elasticbeanstalk-ap-south-1-590184025903 -->

elasticbeanstalk-ap-south-1-590184025903


Plan for tomorrow 
1. setup the github action to deploy the app
2. setup the simple 



Step 3: Use .ebextensions for Custom Commands
Create .ebextensions Directory: Create a directory named .ebextensions in the root of your project.

Create a Configuration File: Create a configuration file named 01_run_migrations.config inside the .ebextensions directory.
```yaml
container_commands:
  01_migrate:
    command: "npm run prisma:migrate"
    leader_only: true
```