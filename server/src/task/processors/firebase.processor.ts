/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { FirebaseService } from 'src/firebase/firebase.service';

@Processor('firebaseQueue')
export class FirebaseProcessor {
  constructor(private readonly firebaseService: FirebaseService) {}
  @Process('sendToFirebase')
  async handleSendToFirebase(job: Job) {
    console.log('firebase task received!');
    const { data } = job;

    await this.firebaseService.writeToDatabase(data, data.id);
    console.log(`Firebase data sent`);
  }
}
