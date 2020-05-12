import React from 'react'

export const style = {
    parent: {
        background: '#FFFFFF',
        fontFamily: '\'Helvetica\', sans-serif',
        width:'800px',
        flexGrow: 10,
    },
    editor: {
        flexGrow: '4',
        textAlign:'left',
        margin: '0.5rem 2rem',
        padding:'1rem',
        border: '1px solid #ccc',
        minHeight:'23rem',
        cursor: 'text',
        width:'auto',
        minWidth:'46rem'
    },
    button: {
        border: 'none',
        background: 'none',
        margin: '0 10',
        textAlign: 'center',
        maxWidth: '150px',
    },
    cardButton: {
        border: 'none',
        background: 'none',
        margin: '0 10',
        textAlign: 'center',
        maxWidth: '150px',
        height: '12px',
    },
    MenuButton: {
        border: 'none',
        background: 'none',
        margin: '0 10',
        textAlign: 'left',
    },
    Menu: {
        backgroundColor: 'rgba(255,255,255,0.85)'
    },
    handle: {
        color: 'rgba(98, 177, 254, 1.0)',
        direction: 'ltr',
        unicodeBidi: 'bidi-override',
    },
    hashtag: {
        color: 'rgba(95, 184, 138, 1.0)',
    },
    richButton: {
        height: 'inherit',
    },
    grid: {
        display: 'flex',
        alignItems: 'center',
    },
    gridItem: {
        margin: '0 1px',
    },
    divider: {
        fontSize: '.5em',
        margin: 0,
        padding:'.1em',
    },
    tabText: {
        padding:'-5px',
        writingMode: 'vertical-rl',
    },
}

export const gridStyle = {
    border: 'None',
    width: 'auto',
    textAlign: 'center',
};

export const styleMap = {
    '#D4D7D1': {
        color: '#D4D7D1'
    },
    '#DAD8C4': {
        color: '#DAD8C4'
    },
    '#D8D4BE': {
        color: '#D8D4BE'
    },
    '#C7B9A3': {
        color: '#C7B9A3'
    },
    '#ABA79A': {
        color: '#ABA79A'
    },
    '#EFCBB5': {
        color: '#EFCBB5'
    },
    '#CBE3FF': {
        color: '#CBE3FF'
    },
    '#7FB7D1': {
        color: '#7FB7D1'
    },
    '#6E96C7': {
        color: '#6E96C7'
    },
    '#808A54': {
        color: '#808A54'
    },
    '#F1DDD6': {
        color: '#F1DDD6'
    },
    '#DEE8DD': {
        color: '#DEE8DD'
    },
    '#B3C6C3': {
        color: '#B3C6C3'
    },
    '#89A78E': {
        color: '#89A78E'
    },
    '#53433F': {
        color: '#53433F'
    },
    '#CBA494': {
        color: '#CBA494'
    },
    '#CB6D3C': {
        color: '#CB6D3C'
    },
    '#9EB3B2': {
        color: '#9EB3B2'
    },
    '#1A3E54': {
        color: '#1A3E54'
    },
    '#642E2C': {
        color: '#642E2C'
    },
    '#E5DFCC': {
        color: '#E5DFCC'
    },
    '#5C6878': {
        color: '#5C6878'
    },
    '#3D4967' : {
        color: '#3D4967' 
    },
    '#3F3845': {
        color: '#3F3845'
    },
    '#EBD57E': {
        color: '#EBD57E'
    },
    '#D0B54E': {
        color: '#D0B54E'
    },
    '#BFDCDD': {
        color: '#BFDCDD'
    },
    '#ACBFDE': {
        color: '#ACBFDE'
    },
    '#4E6F63': {
        color: '#4E6F63'
    },
}

export const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    media: {
        width: '50%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial'
    },
};