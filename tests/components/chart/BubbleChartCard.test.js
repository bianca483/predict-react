import React from 'react';
import {shallow} from 'enzyme';
import {CardTitle} from 'react-md/lib/Cards/index';
import {Chart} from 'react-google-charts';
import BubbleChartCard from '../../../src/components/chart/BubbleChartCard';
import {classColumns} from '../../../src/components/validation/ColumnHelper';

const traces = [[1, 2, 3, 4, 5]];
const cardTitle = 'Card title';

describe('BubbleChartCard', () => {
  const element = shallow(<BubbleChartCard cardTitle={cardTitle} columns={classColumns} vTitle='v' hTitle='h'
                                           data={traces}/>);
  it('renders', () => {
    expect(element).toBeDefined();
    expect(element.find(Chart).length).toBe(1);
    expect(element.find(CardTitle).props().title).toBe(cardTitle);
  });

  it('creates options with titles', () => {
    const chartProps = element.find(Chart).props();

    expect(chartProps.options.vAxis.title).toBe('v');
    expect(chartProps.options.hAxis.title).toBe('h');
    expect(chartProps.graph_id).toBe(cardTitle);
  });
});
