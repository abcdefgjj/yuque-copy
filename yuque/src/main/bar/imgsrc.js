import React from 'react'

import dsbd from '../../img/控制台.png'
import dcmt from '../../img/日志.png'
import reposi from '../../img/资源.png'
import groups from '../../img/CDN节点.png'
import clbr from '../../img/互联网.png'
import topics from '../../img/标签.png'
import following from '../../img/喜欢.png'
import collections from '../../img/收藏.png'
import recent from '../../img/时间.png'
import trashbin from '../../img/删除.png'

const style = {
    height:'30px'
 }
const Dsbd = () => { 
    return <img src={dsbd} style={style} alt =''/>
} 

const Dcmt = () => {
    return <img src={dcmt} style={style} alt='' />
} 

const Reposi = () => {
    return <img src={reposi} style={style} alt='' />
} 
const Groups = () => {
    return <img src={groups} style={style} alt='' />
} 
const Collaborations = () => {
    return <img src={clbr} style={style} alt='' />
} 
const Topics = () => {
    return <img src={topics} style={style} alt='' />
} 
const Following = () => {
    return <img src={following} style={ style} alt='' />
} 
const Collections = () => {
    return <img src={collections} style={style} alt='' />
} 
const Recent = () => {
    return <img src={recent} style={style} alt='' />
} 

const Trash = () => {
    return <img src={trashbin} style={style} alt='' />
} 

export { Dsbd, Dcmt, Reposi, Groups, Collaborations, Topics, Following, Collections, Recent,  Trash }