import { Entity } from 'typeorm';
import { Metric } from '../base/metric';

/**
 * Description of 'data_waitino_take_aggregate' table.
 */
@Entity({
  name: 'data_waitino_take_aggregate',
})
export class Watino extends Metric {}
