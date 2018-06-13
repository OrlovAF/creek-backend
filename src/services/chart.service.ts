import { Injectable } from '@nestjs/common';
import * as D3NodeBarChart from 'd3node-barchart';
import * as output from 'd3node-output';
import * as moment from 'moment';

const {CHART_STORAGE_PATH} = process.env;

@Injectable()
export class ChartService {
  /**
   * Prepare data for chart.
   * Example: from [{date: 'YYYY-MM-DD HH:mm:ss', value: 0}] to [{key: 'HH:mm', value: 0}]
   * @param {any[]} data
   * @returns {any[]}
   */
  static prepareDataForChart(data) {
    return data.map((item) => {
      return {
        key: moment(item.date).format('HH:mm'),
        value: item.value,
      };
    });
  }

  /**
   * Creates new chart with a specific name/data and save it
   * in png/svg/html formats in a specific folder.
   * @param {string} name
   * @param {any} data
   * @returns {Promise<any>}
   */
  static create({name, data}) {
    return new Promise((resolve) => {
      const chartContainer =
        `<div id="container">
          <h2>${name}</h2>
          <div id="chart"></div>
        </div>`;

      output(
        `${CHART_STORAGE_PATH}${name}`,
        D3NodeBarChart({
          data: this.prepareDataForChart(data),
          container: chartContainer,
        }),
        {width: 960, height: 600},
        resolve,
      );
    });
  }
}