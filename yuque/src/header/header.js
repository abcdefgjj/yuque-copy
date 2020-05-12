import React from 'react';

import 'antd/dist/antd.css'
import { Input, Button, Dropdown, Menu,} from 'antd'
import { Link} from 'react-router-dom';

import icon from '../img/logo.png'

import more from '../img/向下.png'
import add from '../img/编辑.png'
import usr from '../img/我的.png'
import exit from '../img/退出.png'
import note from '../img/消息.png'


const { Search } = Input
function handleMenuClick(e) {
    console.log('click', e);
}
const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item>
            <label>Help</label>
        </Menu.Item>
        <Menu.Item>
            <label>Feedback</label>
        </Menu.Item>
        <Menu.Item>
            <label>This menu</label>
        </Menu.Item>
        <Menu.Item>
            <label>Is actually</label>
        </Menu.Item>
        <Menu.Item>
            <label>Of no use</label>
        </Menu.Item>
        <Menu.Item>
            <label>Actually</label>
        </Menu.Item>
    </Menu>
);
class Header extends React.Component { 
    dropdown(e) { 
        console.log(e)
    }
    render() {
        return (
            <div className='header' style={style.header}>
                
                <div>
                    <img src={icon} style={style.logo} alt=''/>
                    
                </div>
                <Search style={style.search} />
                    <div>
                        <Link to='/explorations'>
                            <Button style={style.button}>Exploration</Button>
                        </Link>
                        <Link to='/'>
                            <Button style={style.button}>DashBoard</Button>
                    </Link>
                   
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <Button style={style.imgButton}>
                            <img src={more} style={style.img} alt='' />
                            </Button>
                        </Dropdown>

                    </div>
                <div>
                    <Button style={style.imgButton}><img src={add} style={style.img} alt='' /></Button>
                    <Button style={style.imgButton}><img src={note} style={style.img} alt='' /></Button>
                    <Button style={style.imgButton}><img src={usr} style={style.img} alt='' /></Button>
                    <Button style={style.imgButton}><img src={exit} style={style.img} alt='' /></Button>    
                </div>
                <img alt='' />
                
            </div>
        )
    }
}
const style = {
    header: {
        padding: '.5rem 10rem',
        display: 'flex',
        alignItems:'baseline',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        height:'90px'
    },
    button: {
        border: 'none',
        background: '#FFFFFF',
        height: '30px',
        padding: '0 30px 0 0',
    },
    imgButton: { 
        border: 'none',
        background: '#FFFFFF',
        height: '30px',
        width:'50px'
    },
    img: {
        height: '30px',
        padding:'0',
    },
    logo: {
        height: '70px',
        padding:'10px',
    },
    search: {
        width: '250px',
        height:'30px',
    }

}
export default Header