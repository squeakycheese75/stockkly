import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  WalletSummary from './WalletSummary'


configure({adapter: new Adapter()});
describe('WalletSummary', () => {
  test('some name', () => {
    const test_profile = {
      id: null,
      watchList: ["BTC:USD", "INDEXNASDAQ:.IXIC"],
      currency: "GBP",
      symbol: "£",
      refreshRate: 30,
      devmode: false,
    }

    const test_data = [{}]
    const waller_summary = shallow(<WalletSummary data={test_data} profile={test_profile}/>)
    const add_fn = waller_summary.instance().test_add()
    expect(add_fn).toEqual(10)
  })
})

