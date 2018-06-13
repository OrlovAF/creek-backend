import { Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Base class for metric entities.
 */
export abstract class Metric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  date: Date;

  @Column('float')
  value: number;
}