# Commands

CLI commands are built with [nestjs-command](https://github.com/jiayisheng/nestjs-command) and run through `src/cli.ts`,
which boots the full `AppModule` (database and Redis must be reachable).

```bash
# development (ts-node)
yarn cli hello world

# production (after yarn build)
yarn cli:prod hello world
```

To add a command, create an `@Injectable()` class in this folder with a `@Command()` method and export it from `index.ts`.
It is registered automatically by `AppModule`.
