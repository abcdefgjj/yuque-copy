import React from 'react'
import 'antd/dist/antd.css'
import { Button } from 'antd'
import { Dsbd, Dcmt, Reposi, Groups, Collaborations, Topics, Following, Collections, Recent, Trash } from './imgsrc.js'

import { Link} from 'react-router-dom';

class Bar extends React.Component {
    render() {
        return (
            <div className='bar' style={{ display: 'flex', flexDirection: 'column', minWidth:'160px'}}>
                <div style={style.groups}>
                        <div style={style.items} >
                            <Dsbd />
                            <Link to='/'>
                            <Button style={style.button}>dashboard</Button>
                            </Link>
                    </div>
                    
                    </div>
                <div style={style.groups}>
                
                    <div style={style.items} >
                        <Dcmt />
                        <Link to='/editor'>
                            <Button style={style.button}>Document</Button>
                        </Link>
                    </div>
                        <div style={style.items} >
                            <Reposi />
                            <Link to='/repositories'>
                            <Button style={style.button}>Repositories</Button>
                            </Link>
                        </div>
                        <div style={style.items} >
                            <Groups />
                            <Link to='/groups'>
                            <Button style={style.button}> Groups</Button>
                            </Link>
                    </div>
                    
                </div>
                
                <div style={style.groups}>
                        <div style={style.items} >
                            <Collaborations />
                            <Link to='/collaborations'>
                            <Button style={style.button}>Collaborations</Button>
                            </Link>
                        </div>
                        <div style={style.items} >
                            <Topics />
                            <Link to='/topics'>
                            <Button style={style.button}>Topics</Button>
                            </Link>
                        </div>
                        <div style={style.items} >
                            <Following />
                            <Link to='/following'>
                                <Button style={style.button}>Following</Button>
                                </Link>
                        </div>
                        <div style={style.items} >
                            <Collections />
                            <Button style={style.button}>Collections</Button>
                        </div>
                        <div style={style.items} >
                            <Recent />
                            <Link to='/collections'>
                            <Button style={style.button}>Recent reads</Button>
                            </Link>
                    </div>
                    
                </div>
                
                <div>
                        <div style={style.items}>
                            <Trash />
                            <Link to='/trashbin'>
                                <Button style={style.button}>Trash bin</Button>
                            </Link>
                        </div>
                </div>
            </div>
        )
    }
}
const style =  {
    
    button: {
        border: 'none',
        background: 'none',
    },

    groups: {
        margin: '0px 0px 20px 0px',
        borderBottom: '1px solid #c0c0c0',
        maxWidth: 180
    },
    items: {
        padding: '0px 0px 20px 0px',
    },
    

    }
export default Bar