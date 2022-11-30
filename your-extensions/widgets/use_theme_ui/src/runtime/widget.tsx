
import {React,jsx,AllWidgetProps,css} from 'jimu-core'
import { Button } from 'jimu-ui'

export default class UseThemeUi extends React.PureComponent<AllWidgetProps<any>,any>{

    render(): React.ReactNode {
        console.log(this.props.theme.colors.primary)
        return(
            <div style = {{backgroundColor:this.props.theme.colors.primary,width:"100%",height:"100%"}}>
                <div style = {{color:"white"}}>testing</div>
                <Button type='primary'>
                    <p>Checkinggggg</p>
                </Button>
            </div>
        )
    }

}