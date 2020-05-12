import React from 'react';
import { Card, Button, Modal, Input, Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

const { Panel } = Collapse;
var repList = ['default']
//console.log(localStorage.getItem('reps'))
var repoPassgageList = []

class Rep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalText: [
                <Input key="3000"
                    onChange={(e) => {
                        this.setState({ repoName: e.target.value })
                        
                    }} />],
            visible: false,
            confirmLoading: false,
            repoName: ''
        };
    }
    componentWillMount() {
        if (localStorage.getItem('reps') && typeof (localStorage.getItem('reps')) != "undefined") {
            repList = JSON.parse(localStorage.getItem('reps'))
        }
        //console.log(repList)
        repList.forEach((item) => {
            if (localStorage.getItem(item) && typeof (localStorage.getItem(item)) != "undefined")
                repoPassgageList.push(JSON.parse(localStorage.getItem(item)))
            else
                repoPassgageList.push([])
        })

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({
            ModalText: 'A new repository successfully added!',
            confirmLoading: true,
        });
        repList.push(this.state.repoName)
        localStorage.setItem('reps', JSON.stringify(repList))
        repoPassgageList.push([])
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            repList = JSON.parse(localStorage.getItem('reps'))
        }, 1000);

    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        return (
            <div>
                <Card title={<div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding:'1rem 1rem 0 1rem'
                }}>
                    <p style={{fontSize:'1.1em', fontWeight:'bold'}}>repository</p>
                    <Button onClick={this.showModal.bind(this)}><p>add a new repository</p></Button>
                </div>}>
                    <Collapse
                        style={{background:'none'}}
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        className="site-collapse-custom-collapse"
                    >
                    {repList.map(
                        (item, key) => (<Panel
                            style={{background:'none', fontSize:'1.1em', fontWeight:'bold'}}
                            header={item}
                            className="site-collapse-custom-panel"
                            key={key}
                        >
                            
                            {
                                repoPassgageList[key].map(
                                    (passage, index) => (
                                        <div key={ key*1000 + index} style={{borderBottom:'1px solid #EEE'}}>
                                            <Link to={item+"/"+passage.title}>
                                                <Button key={index * 100} style={{border:'none',fontSize:'.9em', background:'none', padding:' 1em 1em 2em 1em'}}>{passage.title}</Button>
                                            </Link>
                                        </div>
                                    )
                                )
                        
                                }
                                
                        </Panel>)
                        )}
                    </Collapse>,
                </Card>
                <Modal
                    title="Add a repository"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    {ModalText}
                </Modal>
            </div>
        )
    }
}

export default Rep
