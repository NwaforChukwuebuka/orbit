import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSwapFeature1717522400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add swap-related columns to bookings table
    await queryRunner.query(`
      ALTER TABLE bookings 
      ADD COLUMN available_for_swap BOOLEAN DEFAULT false,
      ADD COLUMN swap_available_until TIMESTAMP,
      ADD COLUMN swap_count INTEGER DEFAULT 0
    `);

    // Create swap_requests table
    await queryRunner.query(`
      CREATE TYPE swap_request_status AS ENUM ('pending', 'accepted', 'rejected', 'expired', 'cancelled');
      
      CREATE TABLE swap_requests (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        requestor_booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        requested_booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
        requestor_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        requested_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status swap_request_status NOT NULL DEFAULT 'pending',
        message TEXT,
        resolved_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create index for faster swap request lookups
    await queryRunner.query(`
      CREATE INDEX idx_swap_requests_status ON swap_requests(status);
      CREATE INDEX idx_swap_requests_requestor_booking ON swap_requests(requestor_booking_id);
      CREATE INDEX idx_swap_requests_requested_booking ON swap_requests(requested_booking_id);
      CREATE INDEX idx_swap_requests_requestor_user ON swap_requests(requestor_user_id);
      CREATE INDEX idx_swap_requests_requested_user ON swap_requests(requested_user_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_swap_requests_status;
      DROP INDEX IF EXISTS idx_swap_requests_requestor_booking;
      DROP INDEX IF EXISTS idx_swap_requests_requested_booking;
      DROP INDEX IF EXISTS idx_swap_requests_requestor_user;
      DROP INDEX IF EXISTS idx_swap_requests_requested_user;
    `);

    // Drop swap_requests table
    await queryRunner.query(`
      DROP TABLE IF EXISTS swap_requests;
      DROP TYPE IF EXISTS swap_request_status;
    `);

    // Remove swap-related columns from bookings table
    await queryRunner.query(`
      ALTER TABLE bookings 
      DROP COLUMN IF EXISTS available_for_swap,
      DROP COLUMN IF EXISTS swap_available_until,
      DROP COLUMN IF EXISTS swap_count
    `);
  }
} 