import React  from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Button, Empty } from 'antd'

import { myBlockStyleFn, mediaBlockRenderer } from './editorSrc/editorRender.js'
import { styleMap } from './editorSrc/style.js'
import DraftEditor from './editor.js';

class Doc extends React.Component {
    constructor(props) { 
        super(props)
        this.state = {
            editorState:'',
            passage: '',
            title: this.props.title,
            date: '',
            display: '',
            condition:'waiting',
        }
    }
    componentWillMount() { 
        console.log('document')
        let title = this.props.title
        let repository = this.props.repository
        console.log(repository)
        let passageList = JSON.parse(localStorage.getItem(repository))
        let passage = {content:'', date:'', title:''}
        passageList.forEach((item) => {
            if (item.title === title)
                 passage = item
        })
        let currentState = JSON.parse(passage.content)
        let editorState = EditorState.createWithContent(convertFromRaw(currentState))
        setTimeout(() => {
            this.setState({
                editorState: editorState,
                passage: passage,
                date: passage.date,
                condition: 'display',
                display: (
                    <Editor
                        blockRendererFn={mediaBlockRenderer}
                        editorState={editorState}
                        blockStyleFn={myBlockStyleFn}
                        customStyleMap={styleMap}
                    />
                )
            })
        }, 1)
    }
    render() {
        if (this.state.condition === 'display') {
            return (
                <div>
                    <p style={{ borderBottom: '1px solid #000', margin: 0, display: 'flex', justifyContent: 'space-between', alignItems:'flex-end' }}>
                        <span style={{ fontSize: '2em', fontWeight: 'bold'}}> {this.state.title} </span>
                            <Button style={{ border: 'none' }} onClick={() => { 
                            this.setState({
                                    condition:'editing',
                                    display: (
                                        <DraftEditor display={ true}
                                            displayPassage={ this.state.passage }
                                            editable={ true}
                                            repository={ this.props.repository }
                                    />
                                    )
                                })
                            }}>点击可修改文本</Button>  
                    </p>
                    <p style={{padding:0, margin:0, fontSize:'0.8em', textAlign:'right'}}>create date:{this.state.date}</p><br />
                    <div>
                        {this.state.display}
                        </div>
                </div>
            )
        }
        else if(this.state.condition === 'waiting')
            return (
                <Empty />
            )
        else
            return (
                <div>{this.state.display}</div>
            )
    }
}
export default Doc
