## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Coverage syntax

```bash
/* v8 ignore start */

/* v8 ignore stop */
```

## Migrations

```bash
# generate
$ yarn run migration:generate --name=MIGRATIONS_NAME
```

# CRUD generator [More infomation](https://docs.nestjs.com/recipes/crud-generator)
#### Throughout the life span of a project, when we build new features, we often need to add new resources to our application. These resources typically require multiple, repetitive operations that we have to repeat each time we define a new resource.

### Generating a new resourc
  ``` 
  nest g resource
  ```

## Request lifecycle [Document](https://docs.nestjs.com/faq/request-lifecycle)

1. **Incoming Request**
2. **Middleware**
   - Global-bound middleware
   - Module-bound middleware
3. **Guards**
   - Global guards
   - Controller guards
   - Route guards
4. **Interceptors (Pre-controller)**
   - DTO transformation/validation
5. **Controller**
   - Handles the incoming request
6. **Service**
   - Business logic layer
7. **Interceptors (Post-controller)**
   - Response transformation
8. **Exception Filters**
   - Handles errors and exceptions
9. **Response**

## API Creation Guide

This guide outlines the steps to create an API along with the recommended flow for changing branches.

## Creating an API

Follow these steps to create an API:

1. **Create Entity (if required):**
   - Define the data model or entity structure if it's not already defined.
   - This step involves creating classes or database tables to represent the data your API will handle.

2. **Create Dto, Validate, Interface:**
   - Implement data transfer objects (DTOs) to represent the data exchanged between the client and server.
   - Develop validation logic to ensure the integrity and correctness of the data.
   - Define interfaces that will be implemented by the controller and service layers.

3. **Create Controller:**
   - Implement the controller layer responsible for handling incoming HTTP requests.
   - Map endpoints to specific methods that will process the requests.
   - Validate incoming data and invoke appropriate service methods.

4. **Create Service:**
   - Implement the business logic or application logic in the service layer.
   - Handle complex operations, interactions with the database, and other business-specific tasks.
   - Ensure separation of concerns between the controller and service layers.

5. **Create Repository (if needed):**
   - If your application interacts with a database, create repository classes to manage data persistence.
   - Implement methods for querying, saving, updating, and deleting entities.

## Branch Change Flow

When changing branches in your version control system, follow this flow:

1. **Checkout a New Branch:**
   - Use the appropriate command to switch to a new branch.
   - Ensure the branch name is descriptive and relates to the task or feature being worked on.

2. **Make Changes:**
   - Follow the steps outlined above to make necessary changes to the API or other parts of the codebase.

3. **Commit Changes:**
   - Commit your changes to the current branch using descriptive commit messages.
   - Ensure each commit represents a logical unit of work and adheres to the project's coding standards.

4. **Test Changes (if applicable):**
   - If feasible, perform testing to validate the functionality and integrity of the changes made.
   - This may include unit tests, integration tests, or manual testing depending on the nature of the changes.

5. **Merge or Rebase (if necessary):**
   - Once changes are complete and tested, merge or rebase your branch with the target branch.
   - Resolve any conflicts that may arise during the merge process.

6. **Push Changes:**
   - Push your branch to the remote repository to make your changes available to other team members.

7. **Review and Deploy (if applicable):**
   - If required, submit your changes for code review.
   - Once approved, deploy your changes to the appropriate environment.

Following this flow ensures consistency and helps maintain a clean and organized codebase.

