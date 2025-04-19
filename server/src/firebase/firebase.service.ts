import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import serviceAccount from '../config/firebase-adminsdk.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      databaseURL: this.configService.get<string>('FIREBASE_DATABASE_URL'),
    });
  }

  private getDatabase() {
    return admin.database();
  }

  async writeToDatabase(data: any, bookingId: string) {
    const db = this.getDatabase();
    const ref = db.ref(`bookings/${bookingId}`);
    await ref.set({
      ...data,
      timestamp: admin.database.ServerValue.TIMESTAMP,
    });
  }

  async deleteFromDatabase(bookingId: string) {
    const db = this.getDatabase();
    const ref = db.ref(`bookings/${bookingId}`);
    await ref.remove();
  }
}
