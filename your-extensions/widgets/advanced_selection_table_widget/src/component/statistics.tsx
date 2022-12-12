
import {React,jsx} from 'jimu-core'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AdvancedSelectionTable from '../runtime/widget';
import EnhancedTableToolbar from './common/enhanced_toolbar';
import LayersTable from './layer_table';
import DropDown from './common/dropdown';
const Statistics = require('statistics.js');
import Container from '../assets/css/style';
import '../assets/css/style.scss'
import { CloseOutlined } from 'jimu-icons/outlined/editor/close';
import { Button } from 'jimu-ui';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:400,
  bgcolor: 'background.paper',
  // boxShadow: 24,
  // p: 4,

};

type StateValue = {
  items:{label:string,value:string}[],
  title:string,
  columns:{}
}

type PropsType = {
    parent:LayersTable,
    attributes:any[]
}



export default class StatisticsModal extends React.PureComponent<PropsType,StateValue> {

    state = {items:[],title:" ",columns:{}};
    statistics = null;

    handleClose = () => {
        const self = this.props.parent;
        self.setState({openStatistics:false})
    }

    onSelectField = (field:string)=>{
      this.setState({title:field});
      let mean = null
      let standardDeviation = null;
      let median = null;
      let maximum = null;
      if (this.statistics){
        mean = this.statistics?.arithmeticMean(field);
        standardDeviation = this.statistics?.standardDeviation(field);
        median = this.statistics?.median(field);
        maximum = this.statistics?.maximum(field);
        this.setState({columns:{
          ...this.state.columns,
          "mean":mean,
          "standardDeviation":standardDeviation,
          "median":median,
          "maximum":maximum
        }})
      }
    }

    componentDidMount(): void {
      let items = [];
      let title = " ";
      const attributes = this.props.attributes;
      if (attributes.length > 0){ 
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

    render(){
      return (
            <div>
              <Modal
                open={true}
                onClose={this.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style = {{backgroundColor:"transparent"}}
              >
                <Box sx={style}>
                  <Container 
                    height={60} 
                    borderBottomColor="grey"
                    borderBottomWidth={1}
                    width = {"100%"}

                  >
                    <div className = "layer-content-container" style={{paddingLeft:20,paddingRight:20,height:60}}>
                      <div className='flex-auto cursor-style'>Statistics</div>
                      <div onClick={this.handleClose}>
                        <CloseOutlined />
                      </div> 
                    </div> 
                  </Container>
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
                          const value = !isNaN(this.state.columns[item]) && this.state.columns[item] ? this.state.columns[item]:0
                          return(
                            <div key = {`${k}`+item} className = "layer-content-container row-color-hover margin-top">
                              <div className='flex-auto cursor-style'>
                                {item}
                              </div>
                              <div>
                                {value?.toFixed(4)}
                              </div>
                            </div>
                          )
                        }):null
                    }
                  </Container>
                  <div style = {{display:"flex",justifyContent:"flex-end",paddingBottom:20,paddingRight:20}}>
                    <Button style={{width:100,height:50,borderColor:"lightgrey",borderWidth:1}} onClick = {this.handleClose}>
                      Ok
                    </Button>
                  </div>
                </Box>
              </Modal>
            </div>
        )
    }
}
