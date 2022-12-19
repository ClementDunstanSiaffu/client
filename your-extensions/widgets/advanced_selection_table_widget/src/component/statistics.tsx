
import {React,jsx} from 'jimu-core'
import EnhancedTableToolbar from './common/enhanced_toolbar';
import DropDown from './common/dropdown';
const Statistics = require('statistics.js');
import Container from '../assets/css/style';
import '../assets/css/style.scss'
import { Button } from 'jimu-ui';
import { AdvancedSelectionTableContext } from '../context/context';
import ModalComponent from './common/modal';
import helper from '../helper/helper';

class ModalBody extends React.PureComponent<any,any>{

  static contextType?: React.Context<any> = AdvancedSelectionTableContext;

  statistics = null;

  state = {items:[],title:" ",columns:{}};

  onSelectField = (field:string)=>{
    const attributes = this.context?.selectedAttributes;
    this.setState({title:field});
    let average = null
    let minimum = null;
    let median = null;
    let maximum = null;
    let numberOfItems = null;
    let sumOfValues = null;
    if (this.statistics){
      average = this.statistics?.arithmeticMean(field);
      minimum = this.statistics?.minimum(field);
      median = this.statistics?.median(field);
      maximum = this.statistics?.maximum(field);
      numberOfItems = helper.getNumberOfItemsInField(field,attributes); 
      sumOfValues = helper.getSumOfValues(field,attributes)
      this.setState({columns:{
        ...this.state.columns,
        "Count of items":numberOfItems,
        "Sum of Values":sumOfValues,
        "Minimum":minimum,
        "Maximum":maximum,
        "Average":average,
      }})
    }
  }

  componentDidMount(): void {
    let items = [];
    let title = " ";
    const attributes = this.context?.selectedAttributes;
    if (attributes?.length > 0){ 
      let columns = {};
      items = Object.keys(attributes[0]).reduce((newArr,item)=>{
        newArr.push({label:item,value:item}); 
        columns = {...columns,[item]:"metric"}
        return newArr;
      },[])
      this.statistics = new Statistics(attributes,columns);
    }
    if (items.length > 0){
      title = items[0]?.label
    }
    this.setState({items:items,title:title});
    this.onSelectField(title);
  }

  render(): React.ReactNode {
      return(
        <>
          <EnhancedTableToolbar>
            <div className='layer-content-container'>
              <div style = {{marginRight:20}}>Fields :</div>
              <DropDown items={this.state.items} onClick = {this.onSelectField} title = {this.state.title}/>
            </div>
          </EnhancedTableToolbar>
          <Container 
            height={150} 
            width = {"100%"} 
            overflow = "auto" 
            className='centerize-contents padding-contents20'
            style={{paddingLeft:20,paddingRight:20}}
          >
            {
              Object.keys(this.state.columns).length > 0 ?
                Object.keys(this.state.columns).map((item,k)=>{
                  const value = !isNaN(this.state.columns[item]) && this.state.columns[item] ? this.state.columns[item]:0.00000;
                    return(
                      <div key = {`${k}`+item} className = "layer-content-container row-color-hover margin-top">
                        <div className='flex-auto cursor-style'>{item}</div>
                        <div>{value}</div>
                      </div>
                    )
                  }):null
                }
            </Container>
        </>
      )
  }
}

type StateValue = {
  items:{label:string,value:string}[],
  title:string,
  columns:{}
}

export default class StatisticsModal extends React.PureComponent<any,StateValue> {

  static contextType?: React.Context<any> = AdvancedSelectionTableContext;

  handleClose = () => {
    const advancedSelectionTable = this.context?.parent
    advancedSelectionTable?.setState({openStatistics:false})
  }

  render(){
    const openStatistics = this.context?.openStatistics;
    return (
      <ModalComponent 
        isOpen = {openStatistics}
        toggle = {this.handleClose}
        modalTitle = "Statistics"  
        modalBody={<ModalBody/>}   
      >
        <Button style={{width:100,height:50,borderColor:"lightgrey",borderWidth:1}} onClick = {this.handleClose}>
          Ok
        </Button>
      </ModalComponent> 
    )
  }
}
