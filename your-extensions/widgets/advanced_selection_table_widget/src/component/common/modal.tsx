import {React,jsx} from 'jimu-core';
import { Modal,ModalHeader,ModalBody,ModalFooter} from 'jimu-ui';

type modalType = {
    isOpen:boolean,
    onOpened?:(val?:any)=>void,
    onClosed?:(val?:any)=>void,
    toggle?:(val?:any)=>void,
    onExit?:(val?:any)=>void,
    onEnter?:(val?:any)=>void,
    modalTitle?:string,
    modalBody?:string|Object,
    children?:any,
    centered?:boolean
}

const defaultFunction = ()=>{}

export default class ModalComponent extends React.PureComponent<modalType,any>{

    static defaultProps = {
        isOpen:false,
        onClosed:defaultFunction,
        onOpened:defaultFunction,
        toggle:defaultFunction,
        onExit:defaultFunction,
        onEnter:defaultFunction,
        modalTitle:" ",
        modalBody:" ",
        children:null,
        centered:true
    }

    render(): React.ReactNode {
        
        return(
            <Modal
                isOpen = {this.props.isOpen}
                onClosed={this.props.onClosed}
                onEnter={this.props.onEnter}
                onExit={this.props.onExit}
                onOpened={this.props.onOpened}
                toggle={this.props.toggle}
                centered = {this.props.centered}
            >
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.modalTitle}
                </ModalHeader>
                <ModalBody>
                    {this.props.modalBody}
                </ModalBody>
                <ModalFooter>
                    {this.props.children??" "}
                </ModalFooter>
            </Modal>
        )
    }
}