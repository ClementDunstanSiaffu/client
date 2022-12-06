import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LayerContents from './layer_contents';
import Container from '../assets/css/style';
import '../assets/css/style.scss';
import CloseIcon from '@mui/icons-material/Close';
import * as images from '../assets/images/'

type PropsType = {
    parent:LayerContents,
    anchorEl:EventTarget & HTMLButtonElement
}

const options = [
    {
        name:"Zoom A",
        value:"zoomIn",
        icon:images.zoomIn
    },
    {
        name:"Export in file csv",
        value:"csv",
        icon:images.exportFile
    },
    {
        name:"Export to feature collection",
        value:"json",
        icon:images.exportFile
    },
    {
        name:"Statistics",
        value:"statistics",
        icon:images.statistics
    },
    {
        name:" Create Layer",
        value:"layer",
        icon:images.createLayer
    },
    {
        name:"View in attribute table",
        value:"attributetable",
        icon:images.table
    },
    {
        name:"Delete",
        value:"delete",
        icon:images.deleteIcon
    },
    
    
]

export default class  Options extends React.PureComponent<PropsType,any> {

    onClickZoomIn = ()=>{
        const self = this.props.parent;
        self.props.parent.zoomIn();
    }

    render(){
        const open = Boolean(this.props.anchorEl);
        const self = this.props.parent
        return (
            <div>
                <Menu
                    id="basic-menu"
                    anchorEl={this.props.anchorEl}
                    open={open}
                    onClose={self.handleCloseMoreHorizonIcon}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <Container 
                        width={"90%"} 
                        borderBottomWidth = {1} 
                        borderBottomColor = "lightgrey"
                        height={40}
                        className = 'centerize-contents display-row-contents'
                    >
                        <div className='flex-auto text-style-400'>Select Action</div>
                        <div className='display-flex-end close-button' onClick={self.handleCloseMoreHorizonIcon}>
                            <CloseIcon style={{color:"grey"}}/>
                        </div>
                    </Container>
                    {
                        options.map((option,k)=>{
                            return( 
                                <MenuItem onClick={self.handleCloseMoreHorizonIcon}>
                                    <Container 
                                        width={"100%"} 
                                        className = 'centerize-contents display-row-contents padding-contents10' 
                                        backgroundColor='transparent'
                                        onClick={this.onClickZoomIn}
                                    >
                                        <div>
                                            <img src = {option.icon} className = 'icon-style' />
                                        </div>
                                        <div className='menu-item-text-container'>{option.name}</div>
                                    </Container>
                                </MenuItem>
                            )
                        })
                    }
                </Menu>
    </div>
  );
    }
}