import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { geradorNome } from 'gerador-nome';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

let usersRanking = [];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async saveUser(): Promise<void> {
    const user = new User();
    user.name = geradorNome();
    user.score = Math.floor(Math.random() * 1000);

    await this.usersRepository.save(user);
  }

  list(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async orderUsers() {
    usersRanking = await this.usersRepository.find();
    usersRanking.sort(function (a, b) {
      if (a.score < b.score) return 1;
      if (a.score > b.score) return -1;
      return 0;
    });

    return 'Usuarios ordenados';
  }

  listOrderUser() {
    return usersRanking;
  }

  async getUser(id: number) {
    let found = false;
    let i = 0;
    const user = await this.usersRepository.findOne(id);

    while (!found && i <= usersRanking.length) {
      if (usersRanking[i].id === id) {
        found = true;
      }
      i++;
    }
    user['ranking'] = i;

    return user;
  }

  listSomeUsers(number) {
    const users = [];
    for (let i = 0; i <= number - 1; i++) {
      const userObject = usersRanking[i];
      userObject['ranking'] = i + 1;
      users.push(userObject);
    }

    return users;
  }
}
