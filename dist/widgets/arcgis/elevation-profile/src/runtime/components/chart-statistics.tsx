/** @jsx jsx */
import { React, jsx, IntlShape, ThemeVariables } from 'jimu-core'
import { Label, Button, Icon, Collapse, defaultMessages as jimuUIDefaultMessages } from 'jimu-ui'
import { SettingRow } from 'jimu-ui/advanced/setting-components'
import { convertSingle } from '../../common/unit-conversion'
import defaultMessages from '../translations/default'
import { getRuntimeIcon, unitOptions, ElevationProfileStatisticsName } from '../constants'

const { epIcon } = getRuntimeIcon()

interface Props {
  theme: ThemeVariables
  intl: IntlShape
  parentWidgetId: string
  index: number
  key: number
  legendName: string
  activeDsConfig: any
  selectedElevationUnit: string
  selectedLinearUnit: string
  chartProfileResult: any
  singleSeriesExpandStat: boolean
  selectedStatsDisplay: any
  renderSeries: boolean
  toggledSeriesName: string
  isFlip: boolean
}

interface IState {
  legendExpanded: boolean
  statsResultList: JSX.Element[]
}

export default class ProfileStatistics extends React.PureComponent<Props, IState> {
  private selectedStats: any
  constructor (props) {
    super(props)
    this.state = {
      legendExpanded: false,
      statsResultList: []
    }
  }

  nls = (id: string) => {
    const messages = Object.assign({}, defaultMessages, jimuUIDefaultMessages)
    //for unit testing no need to mock intl we can directly use default en msg
    if (this.props.intl && this.props.intl.formatMessage) {
      return this.props.intl.formatMessage({ id: id, defaultMessage: messages[id] })
    } else {
      return messages[id]
    }
  }

  componentDidMount = () => {
    //generate the statistics list for displaying in the legend section
    this.generateStats()
  }

  generateStats = () => {
    this.selectedStats = []
    this.props.activeDsConfig.profileChartSettings.selectedStatistics.forEach((stats) => {
      if (stats.enabled) {
        this.selectedStats.push({
          label: stats.label,
          name: stats.name
        })
      }
    })
    this.selectedStatisticsDisplay()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.chartProfileResult?.statistics !== this.props.chartProfileResult?.statistics ||
      prevProps.selectedElevationUnit !== this.props.selectedElevationUnit ||
      prevProps.selectedLinearUnit !== this.props.selectedLinearUnit ||
      prevProps.selectedStatsDisplay !== this.props.selectedStatsDisplay ||
      prevProps.isFlip !== this.props.isFlip) {
      this.generateStats()
    }

    if (prevProps.renderSeries !== this.props.renderSeries) {
      this.selectedStatisticsDisplay()
    }
  }

  selectedStatisticsDisplay = () => {
    const items: JSX.Element[] = []
    let statsValueWithUnit = ''
    let statsValue = null
    let statisticsName = ''
    this.selectedStats.forEach((stat) => {
      if (!this.props.renderSeries && this.props.legendName === this.props.toggledSeriesName) { //on series hide, make the statistics values blank
        statsValueWithUnit = '-'
      } else {
        statisticsName = stat.name
        if (!this.props.chartProfileResult) {
          statsValueWithUnit = '-'
        } else {
          if (this.props.isFlip) {
            if (stat.name !== ElevationProfileStatisticsName.AvgElevation &&
              stat.name !== ElevationProfileStatisticsName.MaxDistance &&
              stat.name !== ElevationProfileStatisticsName.MaxElevation &&
              stat.name !== ElevationProfileStatisticsName.MinElevation) {
              statisticsName = this.getReverseStatsOnFlip(stat.name)
            }
          }
          statsValue = this.props.chartProfileResult?.statistics[statisticsName]
          statsValueWithUnit = this.getStatsValueWithUnit(statsValue, statisticsName)
        }
      }
      items.push(<React.Fragment>
        <div tabIndex={0} className={'statistic-info'}>
          <Label id={this.props.parentWidgetId + this.props.index} aria-label={this.nls(stat.name)} className={'statistic-label text-break mb-1 pt-3'}>
            {this.nls(stat.name)}
          </Label>
          <div tabIndex={0} aria-label={statsValueWithUnit}>{statsValueWithUnit}</div>
        </div>
      </React.Fragment>
      )
    })
    this.setState({
      statsResultList: items
    })
  }

  getReverseStatsOnFlip = (statsName: string): string => {
    switch (statsName) {
      case ElevationProfileStatisticsName.MaxPositiveSlope:
        return ElevationProfileStatisticsName.MaxNegativeSlope
      case ElevationProfileStatisticsName.MaxNegativeSlope:
        return ElevationProfileStatisticsName.MaxPositiveSlope
      case ElevationProfileStatisticsName.AvgPositiveSlope:
        return ElevationProfileStatisticsName.AvgNegativeSlope
      case ElevationProfileStatisticsName.AvgNegativeSlope:
        return ElevationProfileStatisticsName.AvgPositiveSlope
      case ElevationProfileStatisticsName.ElevationLoss:
        return ElevationProfileStatisticsName.ElevationGain
      case ElevationProfileStatisticsName.ElevationGain:
        return ElevationProfileStatisticsName.ElevationLoss
    }
  }

  getStatsValueWithUnit = (statVal, name): string => {
    let roundOffStat = ''
    let convertedStats: number = null
    unitOptions.forEach((unit) => {
      if (name === ElevationProfileStatisticsName.MaxDistance) {
        if (unit.value === this.props.selectedLinearUnit) {
          convertedStats = convertSingle(statVal, this.props.chartProfileResult?.effectiveUnits.distance, this.props.selectedLinearUnit)
          roundOffStat = this.props.intl.formatNumber(convertedStats, { maximumFractionDigits: 2 }) + ' ' + this.nls(unit.abbreviation)
        }
      } else if (name === ElevationProfileStatisticsName.MaxPositiveSlope || name === ElevationProfileStatisticsName.MaxNegativeSlope ||
         name === ElevationProfileStatisticsName.AvgPositiveSlope || name === ElevationProfileStatisticsName.AvgNegativeSlope) { //Slope values in degree unit
        if (statVal === null) {
          roundOffStat = '-'
        } else {
          roundOffStat = this.props.intl.formatNumber(statVal, { maximumFractionDigits: 2 }) + ' ' + '\u00b0'
        }
      } else {
        if (unit.value === this.props.selectedElevationUnit) {
          convertedStats = convertSingle(statVal, this.props.chartProfileResult?.effectiveUnits.elevation, this.props.selectedElevationUnit)
          roundOffStat = this.props.intl.formatNumber(convertedStats, { maximumFractionDigits: 2 }) + ' ' + this.nls(unit.abbreviation)
        }
      }
    })
    return roundOffStat
  }

  onExpandClick = () => {
    this.setState({
      legendExpanded: !this.state.legendExpanded
    })
  }

  render () {
    return (<div tabIndex={-1}>
      <div tabIndex={-1} className={'ep-legend-section ep-shadow py-1'}>
        <SettingRow flow={'wrap'}>
          <div tabIndex={0} className={'d-flex justify-content-between w-100 align-items-center'}>
            <Label id={this.props.parentWidgetId + this.props.index} aria-label={this.props.legendName} className={'w-100 legendLabel text-break'}>
              {this.props.legendName}
            </Label>
            {!this.props.singleSeriesExpandStat &&
              <div tabIndex={0} className={this.state.legendExpanded ? 'arrow-up' : 'arrow-down'} >
                <Button id={this.props.parentWidgetId + this.props.index} role={'button'} aria-expanded={this.state.legendExpanded}
                  title={this.nls('expandLegend')} className={'expand-collapse-button'} type={'tertiary'}
                  icon size={'sm'} onClick={this.onExpandClick.bind(this)}>
                  <Icon icon={epIcon.iconExpandCollapse} size={'10'} />
                </Button>
              </div>
            }
          </div>
        </SettingRow>
        <Collapse isOpen={this.state.legendExpanded || this.props.singleSeriesExpandStat}>
          <div tabIndex={-1} className={'stat-content'}>
            <div tabIndex={0} className={'profile-statistics'}>
              {this.state.statsResultList.map((statsResult, index) => (
                <React.Fragment key={index}>
                  {statsResult}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
    )
  }
}
