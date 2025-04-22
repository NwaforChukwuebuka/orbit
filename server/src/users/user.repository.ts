// user.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findByEmailWithRelations(email: string): Promise<User | null> {
    return this.findOne({
      where: { email },
      relations: ['venue', 'tag', 'streak'],
    });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.find({ where: { isActive: true } });
  }

  async findUserByID(userId: string) {
    return this.findOne({ where: { id: userId } });
  }

  async userWithEmailExists(email: string): Promise<boolean> {
    const user = await this.findOne({ where: { email } });
    return !!user;
  }

  async userWithPhoneExists(phone: string): Promise<boolean> {
    const user = await this.findOne({ where: { telephone: phone } });
    return !!user;
  }
}
