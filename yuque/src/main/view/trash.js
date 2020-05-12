import React from 'react';
import Nothing from '../../img/Nothing.png'
const Trash = () => {
    return (
        <div style={{ textAlign: 'center', margin: '10rem auto' }}>
            <img src={Nothing} alt=""></img>
            <p style={{padding:'1rem', fontSize:'1.2em'}}>这里什么都没有</p>
        </div>
    )
}

export default Trash