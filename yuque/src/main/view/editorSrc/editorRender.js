import React from 'react'
import { styles } from './style.js'
import { CompositeDecorator} from 'draft-js'
const myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
        case 'blockquote':
            return 'BlockQuote';
        case 'header-one':
            return 'HeaderOne'
        case 'header-two':
            return 'HeaderTwo'
        case 'header-three':
            return 'HeaderThree'
        case 'header-four':
            return 'HeaderFour'
        case 'header-five':
            return 'HeaderFive'
        case 'header-six':
            return 'HeaderSix'
        case 'unordered-list-item':
            return 'UnorderedListItem'
        case 'ordered-list-item':
            return 'OrderedListItem'
        case 'code-block':
            return 'CodeBlock'
        case 'atomic':
            return 'Atom'
        default:
            return 'Unstyled';
    }
}
const  mediaBlockRenderer = (block) => {
    //console.log(block.getType())
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }

    return null;
}
const Media = (props) => {
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    //console.log(entity)
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'audio') {
        media = <Audio src={src} />;
    } else if (type === 'image') {
        media = <Image src={src} />;
    } else if (type === 'video') {
        media = <Video src={src} />;
    }

    return media;
};
const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
    return <img src={props.src} style={styles.media} alt="" />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};
const Link = (props) => {    // 这里通过contentState来获取entity，之后通过getData获取entity中包含的数据   
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    //console.log(props.children[0].props.text)
    return (
        <a href={url} target='_blank' rel="noopener noreferrer">
            {props.children}
        </a>
    );
};

const decorator = new CompositeDecorator([
    {
        strategy: function (contentBlock, callback, contentState) {
            // 这个方法接收2个函数作为参数，如果第一个参数的函数执行时返回true，就会执行第二个参数函数，同时会将匹配的字符的起始位置和结束位置传递给第二个参数。
            contentBlock.findEntityRanges(
                (character) => {
                    const entityKey = character.getEntity();
                    return (entityKey !== null &&
                        contentState.getEntity(entityKey).getType() === 'LINK'
                    );
                },
                function () {
                    callback(...arguments);
                }

            );
        },
        component: Link
    }
]);

export { myBlockStyleFn, mediaBlockRenderer, Media, Audio, Image, Video, Link, decorator }