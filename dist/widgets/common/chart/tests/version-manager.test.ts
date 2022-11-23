import { Immutable } from 'jimu-core'
import { ByFieldSeriesX, ByFieldSeriesY } from '../src/constants'
import { buildUniqueQuery, setSeriesIdWithNumericField, versionManager } from '../src/version-manager'

let upgrader = null

describe('Version manager test', () => {
  describe('version 1.6.0', () => {
    beforeAll(() => {
      upgrader = versionManager.versions?.filter(function (version) {
        return version.version === '1.6.0'
      })[0]?.upgrader
    })
    it('should upgrade `multipleBarType` to `stackedType`', () => {
      const oldConfig = Immutable({
        webChart: {
          series: [{
            multipleBarType: 'sideBySide'
          }, {
            multipleBarType: 'stacked'
          }]
        }
      })
      const newConfig = upgrader(oldConfig)
      expect(newConfig).toEqual({
        webChart: {
          series: [{
            stackedType: 'sideBySide'
          }, {
            stackedType: 'stacked'
          }]
        }
      })
    })
  })
  describe('version 1.7.0', () => {
    describe('buildUniqueQuery', () => {
      it('by-group', () => {
        const series = Immutable([
          {
            query: {
              groupByFieldsForStatistics: ['category'],
              outStatistics: [
                {
                  onStatisticField: 'numeric0',
                  outStatisticFieldName: 'numeric0_sum',
                  statisticType: 'sum'
                }
              ]
            },
            id: 'numeric0_sum',
            x: 'category',
            y: 'numeric0_sum'
          },
          {
            query: {
              groupByFieldsForStatistics: ['category'],
              outStatistics: [
                {
                  onStatisticField: 'numeric1',
                  outStatisticFieldName: 'numeric1_sum',
                  statisticType: 'sum'
                }
              ]
            },
            id: 'numeric0_sum',
            x: 'category',
            y: 'numeric1_sum'
          }
        ]) as any
        expect(buildUniqueQuery(series)).toEqual({
          groupByFieldsForStatistics: ['category'],
          outStatistics: [
            {
              onStatisticField: 'numeric0',
              outStatisticFieldName: 'numeric0_sum',
              statisticType: 'sum'
            },
            {
              onStatisticField: 'numeric1',
              outStatisticFieldName: 'numeric1_sum',
              statisticType: 'sum'
            }
          ]
        })
      })
      it('by-field', () => {
        const series = Immutable([{
          query: {
            outStatistics: [
              {
                onStatisticField: 'numeric0',
                outStatisticFieldName: 'numeric0_sum',
                statisticType: 'sum'
              }, {
                onStatisticField: 'numeric1',
                outStatisticFieldName: 'numeric1_sum',
                statisticType: 'sum'
              }
            ]
          },
          id: ByFieldSeriesY,
          x: ByFieldSeriesY,
          y: ByFieldSeriesX
        }]) as any
        expect(buildUniqueQuery(series)).toEqual({
          outStatistics: [
            {
              onStatisticField: 'numeric0',
              outStatisticFieldName: 'numeric0_sum',
              statisticType: 'sum'
            },
            {
              onStatisticField: 'numeric1',
              outStatisticFieldName: 'numeric1_sum',
              statisticType: 'sum'
            }
          ]
        })
      })
    })

    describe('setSeriesIdWithNumericField', () => {
      it('by-group', () => {
        const series = Immutable([
          {
            query: {
              groupByFieldsForStatistics: ['category'],
              outStatistics: [
                {
                  onStatisticField: 'numeric0',
                  outStatisticFieldName: 'numeric0_sum',
                  statisticType: 'sum'
                }
              ]
            },
            id: 'numeric0_sum',
            x: 'category',
            y: 'numeric0_sum'
          },
          {
            query: {
              groupByFieldsForStatistics: ['category'],
              outStatistics: [
                {
                  onStatisticField: 'numeric1',
                  outStatisticFieldName: 'numeric1_sum',
                  statisticType: 'sum'
                }
              ]
            },
            id: 'numeric1_sum',
            x: 'category',
            y: 'numeric1_sum'
          }
        ]) as any
        expect(setSeriesIdWithNumericField(series)).toEqual([
          {
            query: {
              groupByFieldsForStatistics: ['category'],
              outStatistics: [
                {
                  onStatisticField: 'numeric0',
                  outStatisticFieldName: 'numeric0_sum',
                  statisticType: 'sum'
                }
              ]
            },
            id: 'numeric0',
            x: 'category',
            y: 'numeric0_sum'
          },
          {
            query: {
              groupByFieldsForStatistics: ['category'],
              outStatistics: [
                {
                  onStatisticField: 'numeric1',
                  outStatisticFieldName: 'numeric1_sum',
                  statisticType: 'sum'
                }
              ]
            },
            id: 'numeric1',
            x: 'category',
            y: 'numeric1_sum'
          }
        ])
      })
      it('by-field', () => {
        const series = Immutable([{
          query: {
            outStatistics: [
              {
                onStatisticField: 'numeric0',
                outStatisticFieldName: 'numeric0_sum',
                statisticType: 'sum'
              }, {
                onStatisticField: 'numeric1',
                outStatisticFieldName: 'numeric1_sum',
                statisticType: 'sum'
              }
            ]
          },
          id: ByFieldSeriesY,
          y: ByFieldSeriesX,
          x: ByFieldSeriesY
        }]) as any
        expect(setSeriesIdWithNumericField(series)).toEqual(series)
      })
    })
    describe('version 1.7.0', () => {
      beforeAll(() => {
        upgrader = versionManager.versions?.filter(function (version) {
          return version.version === '1.7.0'
        })[0]?.upgrader
      })
      it('should upgrade successfully for `by-group` mode', () => {
        const oldConfig = Immutable({
          webChart: {
            series: [
              {
                query: {
                  groupByFieldsForStatistics: ['category'],
                  outStatistics: [
                    {
                      onStatisticField: 'numeric0',
                      outStatisticFieldName: 'numeric0_sum',
                      statisticType: 'sum'
                    }
                  ]
                },
                id: 'numeric0_sum',
                x: 'category',
                y: 'numeric0_sum'
              },
              {
                query: {
                  groupByFieldsForStatistics: ['category'],
                  outStatistics: [
                    {
                      onStatisticField: 'numeric1',
                      outStatisticFieldName: 'numeric1_sum',
                      statisticType: 'sum'
                    }
                  ]
                },
                id: 'numeric1_sum',
                x: 'category',
                y: 'numeric1_sum'
              }
            ] as any
          }
        })
        const newConfig = upgrader(oldConfig)

        expect(newConfig).toEqual({
          webChart: {
            dataSource: {
              query: {
                groupByFieldsForStatistics: ['category'],
                outStatistics: [
                  {
                    onStatisticField: 'numeric0',
                    outStatisticFieldName: 'numeric0_sum',
                    statisticType: 'sum'
                  },
                  {
                    onStatisticField: 'numeric1',
                    outStatisticFieldName: 'numeric1_sum',
                    statisticType: 'sum'
                  }
                ]
              }
            },
            series: [
              {
                id: 'numeric0',
                x: 'category',
                y: 'numeric0_sum'
              },
              {
                id: 'numeric1',
                x: 'category',
                y: 'numeric1_sum'
              }
            ] as any
          }
        })
      })
      it('should upgrade successfully for `by-field` mode', () => {
        const oldConfig = Immutable({
          webChart: {
            series: [
              {
                query: {
                  outStatistics: [
                    {
                      onStatisticField: 'numeric0',
                      outStatisticFieldName: 'numeric0_sum',
                      statisticType: 'sum'
                    }, {
                      onStatisticField: 'numeric1',
                      outStatisticFieldName: 'numeric1_sum',
                      statisticType: 'sum'
                    }
                  ]
                },
                id: ByFieldSeriesY,
                y: ByFieldSeriesX,
                x: ByFieldSeriesY
              }
            ] as any
          }
        })
        const newConfig = upgrader(oldConfig)

        expect(newConfig).toEqual({
          webChart: {
            dataSource: {
              query: {
                outStatistics: [
                  {
                    onStatisticField: 'numeric0',
                    outStatisticFieldName: 'numeric0_sum',
                    statisticType: 'sum'
                  },
                  {
                    onStatisticField: 'numeric1',
                    outStatisticFieldName: 'numeric1_sum',
                    statisticType: 'sum'
                  }
                ]
              }
            },
            series: [
              {
                id: ByFieldSeriesY,
                y: ByFieldSeriesX,
                x: ByFieldSeriesY
              }
            ] as any
          }
        })
      })
    })
  })
})
