import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import {
	IUserRepository
} from 'src/interfaces';
import {
	Repository
} from 'typeorm';


@Injectable()
export class UserRepository implements IUserRepository {
  private repositoryName;
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {
    
    
  }
}