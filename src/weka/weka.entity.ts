import { Entity } from 'typeorm';
import { Metric } from '../base/metric';

/**
 * Description of 'data_weka_take_aggregate' table.
 */
@Entity({
  name: 'data_weka_take_aggregate',
})
export class Weka extends Metric {}