import { MenuComponent } from './MenuComponent';
import * as React from "react";

import loadIconUrl from './images/loadIcon.png';
import trashcanUrl from './images/trashcan.png';

export interface LoadControlProps{
    loadState: (a: any) => void,
    sendMessage: (msg: string) => void,
    showEvent: () => void,
}

export class LoadControl extends React.Component<LoadControlProps, {visible: boolean}>{
    protected showEvent: () => void;
    protected updateSaveDataList: () => void;

    constructor(props: LoadControlProps){
        super(props);
        this.state = {visible: false};
    }
    
    render(){
        const config = {
            buttonTop: 34 * 2,
            buttonHeight: 32,
            buttonWidth: 32,
        };
        let saveDataList = (localStorage.getItem('WebGLOrbiterSavedData') ? JSON.parse(localStorage.getItem('WebGLOrbiterSavedData')) : []);
        const valueElement =
            saveDataList.map((saveData: any, i: number) =>
                <div
                    style={{
                        margin: "5px",
                        padding: "5px",
                        border: "1px solid #ff00ff",
                    }}
                    onClick={((saveData) =>
                        () => {
                            this.props.loadState(saveData.state);
                            this.props.sendMessage('Game State Loaded!');
                            this.setState({visible: false});
                        }
                    )(saveData)}>
                <div
                    style={{
                        width: "100%",
                        marginRight: -32,
                        display: "inline-block",
                        overflow: "auto"
                    }}>
                {saveData.title}
                </div>
                <img
                    src={trashcanUrl}
                    style={{width: '20px'}}
                    onClick={((i) =>
                    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
                        saveDataList.splice(i, 1);
                        localStorage.setItem('WebGLOrbiterSavedData', JSON.stringify(saveDataList));
                        this.props.sendMessage('Game State Deleted!');
                        this.setState({visible: false});
                        event.stopPropagation();
                    }
                    )(i)
                    }/>
                </div>
            );
        
        return <MenuComponent
            config={config}
            caption="Load data"
            iconUrl={loadIconUrl}
            visible={this.state.visible}
            onSetVisible={(v) => this.setState({visible: v})}
            style={"5px ridge #ff7fff"}
            ><div>{valueElement}</div></MenuComponent>;
    }
}

