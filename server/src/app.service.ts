import { Injectable } from '@nestjs/common';

export interface RootData {
  message: string;
  version: string;
  developers: string;
}

@Injectable()
export class AppService {
  root(): RootData {
    console.log(name);
    const data: RootData = {
      message: 'Welcome to Orbit Workspace API',
      version: '1.0.0',
      developers: 'Team Orbit',
    };
    return data;
  }
}
