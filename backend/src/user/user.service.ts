import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/userDto';
import { Role } from 'src/enums/roles.enum';
import { Cart } from 'src/entities/cart.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: { id: id },
      relations: ['orders'],
    });
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepo.findOne({ where: { email: userName } });
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.created_time = Date.now().toString();
    createUserDto.role = Role.User;
    const user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  async createAdmin(createUserDto: CreateUserDto) {
    createUserDto.created_time = Date.now().toString();
    createUserDto.role = Role.Admin;
    const user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }

  // async findOrders(id: number) {
  //   return (await this.userRepo.findOne({ where: { id: id } })).orders;
  // }

  async findAll() {
    return await this.userRepo.find();
  }

  // async findCart(id: number) {
  //   console.log((await this.userRepo.findOne({ where: { id: id } })).cart);
  //   return (await this.userRepo.findOne({ where: { id: id } })).cart;
  // }

  async getOrders(id: number) {
    return await this.userRepo.find({
      where: {
        orders: {
          user: { id: id },
        },
      },
      select: ['orders'],
    });
  }
}
