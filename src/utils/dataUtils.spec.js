import { sum_key_values } from "./dataUtils";

describe('sum data', () => {
  test('some name', () => {
    const data = [{'total': 100}, {'total': 10}]
    const resval = sum_key_values(data, 'total')
    expect(resval).toEqual(110)
  })
})

