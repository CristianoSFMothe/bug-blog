import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Etapa 1: buscar um usuário com o email fornecido
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Se nenhum usuário for encontrado, gera um erro
    if (!user) {
      throw new NotFoundException('No user found for email');
    }

    // Passo 2: Verifique se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Se a senha não corresponder, gera um erro
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Passo 3: Gere um JWT contendo o ID do usuário e retorne-o
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      email: user.email,
    };
  }
}
