import React from 'react';
import { Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw} from 'draft-js';
import './editorSrc/document.css'
import './editorSrc/style.css'

import { message, Button, Dropdown, Menu, Popover, Input, Card, Tabs, Divider, Modal, notification } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {Main} from '../main.js'
import { style, styleMap, gridStyle, styles } from './editorSrc/style.js'

import hyperlink from '../../img/超链接.png'
import mediaButton from '../../img/图片.png'

import { myBlockStyleFn, mediaBlockRenderer,decorator }from './editorSrc/editorRender.js'

const { TabPane } = Tabs;
var repList = ['default']
const popover = {
    visibility: false,
    url: ''
}
var contenttable = []
if (localStorage.getItem('table') && typeof(contenttable) !== "undefined")
  contenttable = JSON.parse(localStorage.getItem('table'));
var passages = JSON.parse(localStorage.getItem('default'))
class DraftEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(decorator),
            displayPassage: this.props.displayPassage,
            
            urlValue: '',

            mediaurl: '',
            mediaurlType: 'image',
            
            url: '',
            title: '',

            reRepository: '',
            reTitle: '',
            
            repoButtonContent: "请选择仓库",
            repoChoice: "default",
            repList: repList,

            Modalvisible: false,
            ModalConfirmLoading: false,
            ModalText:'保存成功！',
        };
        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
        this.logState = () => {
            //const content = this.state.editorState.getCurrentContent();
            //console.log(convertToRaw(content));
        };
        this.onmediaurlChange = (e) => {
            var png = /.png\b/
            var PNG = /.PNG\b/
            var jpg = /.jpg\b/
            var JPG = /.JPG\b/
            var jpeg = /.jpeg\b/
            var JPEG = /.JPEG\b/
            var svg = /.svg\b/
            var SVG = /.SVG\b/
            var gif = /.gif\b/
            var GIF = /.GIF\b/

            var mp4 = /.mp4\b/
            var mkv = /.mkv\b/
            var rmvb = /.rmvb\b/
            var mov = /.mov\b/
            var MOV = /.MOV\b/
            var asf = /.asf\b/
            var avi = /.avi\b/

            var wav = /.wav\b/
            var flac = /.flac\b/
            var FLAC = /.FLAC\b/
            var mp3 = /.mp3\b/
            var MP3 = /.MP3\b/
            var WMA = /.WMA\b/
            var wma = /.wma\b/
            const type = e.target.value
            if (jpg.test(type) || JPG.test(type) ||
                png.test(type) || PNG.test(type) ||
                jpeg.test(type) || JPEG.test(type) ||
                svg.test(type) || SVG.test(type) ||
                gif.test(type) || GIF.test(type))
                this._addImage();
            else if (mp4.test(type) || mkv.test(type) ||
                rmvb.test(type) || mov.test(type) ||
                MOV.test(type) || asf.test(type) ||
                avi.test(type))
                this._addVideo();
            else if (wav.test(type) || flac.test(type) ||
                FLAC.test(type) || mp3.test(type) ||
                MP3.test(type) || wma.test(type) ||
                WMA.test(type))
                this._addAudio();
            else
                this._addImage();
            this.setState({ mediaurlValue: e.target.value })
        };
        this.promptForLink = this._promptForLink.bind(this);
        this.onURLChange = (e) => {
            //console.log(e.target.value);
            popover.url = e.target.value;
            this.setState({ urlValue: e.target.value })
        };
        this.confirmLink = this._confirmLink.bind(this);
        this.onLinkInputKeyDown = this._onLinkInputKeyDown.bind(this);
        this.removeLink = this._removeLink.bind(this);

        this.addAudio = this._addAudio.bind(this);
        this.addImage = this._addImage.bind(this);
        this.addVideo = this._addVideo.bind(this);
        this.confirmMedia = this._confirmMedia.bind(this);
        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.onmediaurlInputKeyDown = this._onmediaurlInputKeyDown.bind(this);
    }
    _onStyleClick(e) {
        //console.log(e.currentTarget.value)
        switch (e.currentTarget.value) {
            case 'BOLD':
                this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
                break
            case 'ITALIC':
                this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
                break
            case 'UNDERLINE':
                this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
                break
            case 'STRIKETHROUGH':
                this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
                break
            default:
                console.log(e)
                break
        }
    }

    _onBlockClick(e) {
        //console.log(e.currentTarget.value)
        switch (e.currentTarget.value) {
            case 'H1':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'header-one'))
                break
            case 'H2':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'header-two'))
                break
            case 'H3':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'header-three'))
                break
            case 'H4':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'header-four'))
                break
            case 'H5':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'header-five'))
                break
            case 'H6':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'header-six'))
                break
            case 'BQ':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'blockquote'))
                break
            case 'CB':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'code-block'))
                break
            case 'Atomic':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'atomic'))
                break
            case 'OL':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'ordered-list-item'))
                break
            case 'UL':
                this.onChange(RichUtils.toggleBlockType(
                    this.state.editorState, 'unordered-list-item'))
                break
            default:
                console.log(e);
                break
        }
    }

    save(e) {
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let hour = new Date().getHours();
        let minut = new Date().getMinutes();
        let second = new Date().getSeconds();
        date = JSON.stringify(year) + "-" + JSON.stringify(month) + "-" + JSON.stringify(date) + " "
                + JSON.stringify(hour) + ":" + JSON.stringify(minut) + ":" + JSON.stringify(second)
        if (JSON.parse(localStorage.getItem(this.state.repoChoice)) && typeof (JSON.parse(localStorage.getItem(this.state.repoChoice))) != "undefined") {
             passages = JSON.parse(localStorage.getItem(this.state.repoChoice))
        }
        else
            passages = []
        let content = this.state.editorState.getCurrentContent()
        if (this.props.display) {
            contenttable.forEach(
                item => {
                    if (item.title === this.state.reTitle && item.repository === this.state.reRepository) {
                        item.repository = this.state.repoChoice
                        item.title = this.state.title
                    }
                }
            )
            if (this.state.repoChoice !== this.props.repository) {
                let index = 0;
                let passagesPrev = JSON.parse(localStorage.getItem(this.state.reRepository))
                passagesPrev.forEach(
                    (item, key) => {
                        if (item.title === this.state.reTitle) {
                            item.title = this.state.title
                            item.content = JSON.stringify(convertToRaw(content))
                            index = key
                        }
                    }
                )
                passagesPrev.splice(index, 1)
                passages.unshift({ title: this.state.title, date: date, content: JSON.stringify(convertToRaw(content)) })
                localStorage.setItem(this.state.reRepository, JSON.stringify(passagesPrev))
            }
            else {
                passages.forEach(item => {
                    if (item.title === this.state.reTitle) {
                        item.content = JSON.stringify(convertToRaw(content))
                        item.title = this.state.title
                    }
                });
            }
            
        }
        else {
            console.log('New save!')
            passages.unshift({ title: this.state.title, date: date, content: JSON.stringify(convertToRaw(content)) })
            contenttable.unshift({ title: this.state.title, repository: this.state.repoChoice, date: date })
        }
        localStorage.setItem('table', JSON.stringify(contenttable))
        localStorage.setItem(this.state.repoChoice, JSON.stringify(passages))
        contenttable = JSON.parse(localStorage.getItem('table'))
        this.setState({ ModalVisible: true })
        setTimeout(() => {
            localStorage.setItem('missing', JSON.stringify({ state: 'empty' }))
        }, 1)
    }

    _onColorStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }
    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _confirmMedia(e) {
        e.preventDefault();
        const { editorState, mediaurlValue, mediaurlType } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            mediaurlType,
            'IMMUTABLE',
            { src: mediaurlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity }
        );

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            ),
        }, () => {
            setTimeout(() => this.focus(), 0);
        });
    }

    _onmediaurlInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmMedia(e);
        }
    }

    _promptForMedia(type) {
        this.setState({

            mediaurlValue: '',
            mediaurlType: type,
        }, () => {
            setTimeout(() => this.refs.mediaurl.focus(), 0);
        });
    }

    _addAudio() {
        this._promptForMedia('audio');
    }

    _addImage() {
        this._promptForMedia('image');
    }

    _addVideo() {
        this._promptForMedia('video');
    }

    _promptForLink(e) {
        e.preventDefault();
        const { editorState } = this.state;

        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();
        const startOffset = editorState.getSelection().getStartOffset();
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

        let url = '';
        if (linkKey) {
            const linkInstance = contentState.getEntity(linkKey);
            url = linkInstance.getData().url;
        }

        this.setState({

            urlValue: url,
        }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
        });
        // console.log(this.state.showURLInput)

    }

    _confirmLink(e) {
        e.preventDefault();
        const { editorState, urlValue } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            { url: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        this.setState({
            editorState: RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            ),
            urlValue: '',
        }, () => {
            setTimeout(() => this.refs.editor.focus(), 0);
        });
    }

    _onLinkInputKeyDown(e) {
        if (e.which === 13) {
            this._confirmLink(e);
        }
    }

    _removeLink(e) {
        e.preventDefault();
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            this.setState({
                editorState: RichUtils.toggleLink(editorState, selection, null),
            });
        }
    }
    componentWillMount() {
        if (localStorage.getItem('reps') && typeof (localStorage.getItem('reps') ) !== "undefined")
            repList = JSON.parse(localStorage.getItem('reps'))
        setTimeout(() => {
            this.setState({
                repList: repList,
            });
         }, 1);
        //console.log('edit!')
        let passage = this.props.displayPassage
        if (this.props.display) {
            var currentState = JSON.parse(passage.content)
            //console.log(currentState)
            this.setState({
                editorState: EditorState.createWithContent(convertFromRaw(currentState)),
                title: passage.title,
                reTitle: passage.title,
                repository: this.props.repository,
                repoChoice:this.props.repository,
                reRepository: this.props.repository,
                repoButtonContent: this.props.repository,
                displayPassage: passage
            })
        }
     }
    componentDidMount() {
        this.focus();
        const key = `open${Date.now()}`;
        const btn = (
            <Button onClick={() => {
                let missingdata = JSON.parse(localStorage.getItem('missing'))
                let missingContent = missingdata.content
                let title = missingdata.title
                let repository = missingdata.repository
                this.setState({
                    editorState: EditorState.createWithContent(convertFromRaw(missingContent)),
                    title: title,
                    repoButtonContent: repository
                })
                console.log('已载入未保存数据')
            }}>确定</Button>
        )
        const close = () => {
            localStorage.setItem('missing', JSON.stringify({ state: 'empty' }))
        };
        if (localStorage.getItem('missing') && typeof (localStorage.getItem('missing')) !== "undefined") {
            let missingPassage = JSON.parse(localStorage.getItem('missing'))
            if (missingPassage.state === 'missing') {
                notification.open({
                    message: '数据恢复',
                    description:
                        '点击确定恢复未保存数据，若不选择恢复该数据将丢失',
                    btn,
                    key,
                    duration: 3,
                    onClose: close,
                });
            }
        }
        this.timerID = setInterval(
            () => { 
                //console.log(this.state.editorState.getCurrentContent())
                let content = convertToRaw(this.state.editorState.getCurrentContent())
                let repoChoice = this.state.repoButtonContent
                let title = this.state.title
                let missingPrevent = {state:'missing',content:content, repository:repoChoice, title:title}
                localStorage.setItem('missing', JSON.stringify(missingPrevent))
                message.success('当前数据已缓存');
            },
            300000
        );
    }
    
    componentWillUnmount() {
        contenttable = JSON.parse(localStorage.getItem('table'))
        this.setState = (state, callback) => {
        return;
        };
    }
    render() {
        var HMenu = (
            <Menu style={style.Menu}>
                <Menu.Item >
                    <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='H1'>H1</Button>
                </Menu.Item >
                <Menu.Item>
                    <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='H2'>H2</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='H3'>H3</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='H4'>H4</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='H5'>H5</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='H6'>H6</Button>
                </Menu.Item>
            </Menu>
        )
        var LMenu =  (
                <Menu style={style.Menu}>
                    <Menu.Item >
                        <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='OL'>OL</Button>
                    </Menu.Item >
                    <Menu.Item>
                        <Button style={style.MenuButton} onClick={this._onBlockClick.bind(this)} value='UL'>UL</Button>
                    </Menu.Item>
                </Menu>
            )
        var ColorPage0 =  (
                    <div>
                        <div style={style.grid}>
                            <div style={style.gridItem}>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#D4D7D1' }}
                                    onClick={() => { this._onColorStyle('#D4D7D1') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#DAD8C4' }}
                                    onClick={() => { this._onColorStyle('#DAD8C4') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#D8D4BE' }}
                                    onClick={() => { this._onColorStyle('#D8D4BE') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#C7B9A3' }}
                                    onClick={() => { this._onColorStyle('#C7B9A3') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#ABA79A' }}
                                    onClick={() => { this._onColorStyle('#ABA79A') }}
                                    value='color'
                                >  </Card.Grid>
                            </div>
                        </div>
                        <Divider style={style.divider}>···</Divider>
                        <div style={style.grid}>
                            <div style={style.gridItem}>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#642E2C' }}
                                    onClick={() => { this._onColorStyle('#642E2C') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#E5DFCC' }}
                                    onClick={() => { this._onColorStyle('#E5DFCC') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#5C6878' }}
                                    onClick={() => { this._onColorStyle('#5C6878') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#3D4967' }}
                                    onClick={() => { this._onColorStyle('#3D4967') }}
                                    value='color'
                                >  </Card.Grid>
                                <Card.Grid
                                    style={{ ...gridStyle, background: '#3F3845' }}
                                    onClick={() => { this._onColorStyle('#3F3845') }}
                                    value='color'
                                >  </Card.Grid>
                            </div>
                        </div>
                    </div>
                )
        var ColorPage1 =  (
                        <div>
                            <div style={style.grid}>
                                <div style={style.gridItem}>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#EBD57E' }}
                                        onClick={() => { this._onColorStyle('#EBD57E') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#D0B54E' }}
                                        onClick={() => { this._onColorStyle('#D0B54E') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#BFDCDD' }}
                                        onClick={() => { this._onColorStyle('#BFDCDD') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#ACBFDE' }}
                                        onClick={() => { this._onColorStyle('#ACBFDE') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#4E6F63' }}
                                        onClick={() => { this._onColorStyle('#4E6F63') }}
                                        value='color'
                                    >  </Card.Grid>
                                </div>
                            </div>
                            <Divider style={style.divider}>···</Divider>
                            <div style={style.grid}>
                                <div style={style.gridItem}>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#EFCBB5' }}
                                        onClick={() => { this._onColorStyle('#EFCBB5') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#CBE3FF' }}
                                        onClick={() => { this._onColorStyle('#CBE3FF') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#7FB7D1' }}
                                        onClick={() => { this._onColorStyle('#7FB7D1') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#6E96C7' }}
                                        onClick={() => { this._onColorStyle('#6E96C7') }}
                                        value='color'
                                    >  </Card.Grid>
                                    <Card.Grid
                                        style={{ ...gridStyle, background: '#808A54' }}
                                        onClick={() => { this._onColorStyle('#808A54') }}
                                        value='color'
                                    >  </Card.Grid>
                                </div>
                            </div>
                        </div>
                    )
        var ColorPage2 = (
            <div>
                                <div style={style.grid}>
                                    <div style={style.gridItem}>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#F1DDD6' }}
                                            onClick={() => { this._onColorStyle('#F1DDD6') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#DEE8DD' }}
                                            onClick={() => { this._onColorStyle('#DEE8DD') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#B3C6C3' }}
                                            onClick={() => { this._onColorStyle('#B3C6C3') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#89A78E' }}
                                            onClick={() => { this._onColorStyle('#89A78E') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#53433F' }}
                                            onClick={() => { this._onColorStyle('#53433F') }}
                                            value='color'
                                        >  </Card.Grid>
                                    </div>
                                </div>
                                <Divider style={style.divider}>···</Divider>
                                <div style={style.grid} >
                                    <div style={style.gridItem}>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#CBA494' }}
                                            onClick={() => { this._onColorStyle('#CBA494') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#CB6D3C' }}
                                            onClick={() => { this._onColorStyle('#CB6D3C') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#9EB3B2' }}
                                            onClick={() => { this._onColorStyle('#9EB3B2') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#1A3E54' }}
                                            onClick={() => { this._onColorStyle('#1A3E54') }}
                                            value='color'
                                        >  </Card.Grid>
                                        <Card.Grid
                                            style={{ ...gridStyle, background: '#0D171F' }}
                                            onClick={() => { this._onColorStyle('#53433F') }}
                                            value='color'
                                        >  </Card.Grid>
                                    </div>
                                </div>
                            </div>
        )
        var repoMenu= () => (
            <Menu style={style.Menu}>
                {
                    repList.map((item, index) =>
                        (<Menu.Item key={index}>
                            <Button value={item}
                                style={{ ...style.MenuButton, width: 'inherit' }}
                                onClick={(e) => {
                                    this.setState({
                                        repoButtonContent: e.target.value,
                                        repoChoice: e.target.value
                                    })
                                }}
                            >
                                {item}
                            </Button>
                        </Menu.Item>))
                }

            </Menu>
        )
        return (
            <div style={style.parent}>
                <div style={{padding:'2rem 2rem 0rem 2rem',borderBottom:'1px solid #EEE'}}>
                <Input
                    placeholder="please enter the title"
                    value={this.state.title}
                        onChange={this._onTitleChange.bind(this)}
                        ref="titleInput"
                    style={{ background: 'none', height:'3rem',width: '30rem', margin: '0 0 1rem 0' }}
                />
                    <Dropdown overlay={repoMenu} placement="bottomCenter">
                        <Button style={{ ...style.button, margin: '0 0 0 2rem' }}>
                            <span ref="repoChoice">
                            {this.state.repoButtonContent}
                            </span>
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div style={{ alignItems:'center', padding:'0 0 .5rem 0', display:'flex', flexDirection:'column'}}>
                <div className="ToolBar" style={{margin:'1rem 0 0 0'}}>
                    <Button style={style.button} onClick={this._onStyleClick.bind(this)} value='BOLD'>B</Button>
                    <Button style={style.button} onClick={this._onStyleClick.bind(this)} value='ITALIC'>I</Button>
                    <Button style={style.button} onClick={this._onStyleClick.bind(this)} value='UNDERLINE'>U</Button>
                    <Button style={style.button} onClick={this._onStyleClick.bind(this)} value='STRIKETHROUGH'>S</Button>

                    <Dropdown overlay={HMenu} placement="bottomCenter">
                        <Button style={style.button}>H <DownOutlined /> </Button>
                    </Dropdown>
                    <Dropdown overlay={LMenu} placement="bottomLeft">
                        <Button style={style.button}>List <DownOutlined /> </Button>
                    </Dropdown>
                    <Button style={style.button} onClick={this._onBlockClick.bind(this)} value='BQ'>BlackQuote</Button>
                    <Button style={style.button} onClick={this._onBlockClick.bind(this)} value='CB'>CodeBlock</Button>
                        <Popover
                        content={
                            <Tabs defaultActiveKey="1"

                                size={'small'}
                                tabPosition={'bottom'}
                                style={{ padding: 'none', width: '242px' }}
                                onClick={(e) => { console.log(e.target.getBoundingClientRect()) }}
                            >
                                <TabPane tab="`Monet" key="3">
                                    {ColorPage0}
                                </TabPane>
                                <TabPane tab="`Cézanne" key="1">
                                    {ColorPage1}
                                </TabPane>
                                <TabPane tab="`Degas" key="2">
                                    {ColorPage2}
                                </TabPane>

                            </Tabs>
                        }
                        trigger="hover"
                        placement="bottom"
                    >
                        <Button style={style.button} >Color</Button>
                    </Popover>
                    <Popover
                        content={
                            <div style={{ padding: '0 0 10px 0' }}>
                                <Input
                                    onChange={this.onURLChange}
                                    ref="url"
                                    style={styles.urlInput}
                                    type="text"
                                    value={popover.url}

                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onMouseDown={this.confirmLink} style={style.cardButton}>Add Link</Button>
                                    <Button onMouseDown={this.removeLink} style={style.cardButton}>Remove Link</Button>
                                </div>
                            </div>
                        }
                        title="Please enter the hyperlink below"
                        trigger="hover"
                        placement="bottom"
                    //visible={popover.visibility}
                    >
                        <Button style={{ ...style.button, height: '15px' }} value='Link'>
                            <img style={{ ...style.richButton }} src={hyperlink} alt="" />
                        </Button>
                    </Popover>
                    <Popover
                        content={
                            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                <Input
                                    onChange={this.onmediaurlChange}
                                    ref="mediaurl"

                                    type="text"
                                    value={this.state.mediaurlValue}
                                    onKeyDown={this.onmediaurlInputKeyDown}
                                />
                                <Button onMouseDown={this.confirmMedia} style={style.cardButton}>Confirm</Button>
                            </div>
                        }
                        title="Please enter the media link below"
                        trigger="hover"
                        placement="bottom"
                    //visible={popover.visibility}
                    >
                        <Button style={{ ...style.button, height: '15px' }} value='Link'>
                            <img style={{ ...style.richButton }} src={mediaButton} alt="" />
                            </Button>
                            
                        </Popover>

                </div>
                <div className="Editor" style={style.editor} onClick={this.focus}>
                        <Editor
                        placeholder="Enter some text..."
                        blockRendererFn={mediaBlockRenderer}
                        editorState={this.state.editorState}
                        handleKeyCommand={this._handleKeyCommand.bind(this)}
                        onChange={this.onChange}
                        blockStyleFn={myBlockStyleFn}
                        ref="editor"
                        customStyleMap={styleMap}

                    />
                </div>
                <Button
                    onClick={this.save.bind(this)}
                    
                    type="button"
                >
                        Save
                </Button>
                    <Link to='/'>
                    <Modal
                        visible={this.state.ModalVisible}
                        onOk={this.ModalHandleOk.bind(this)}
                        confirmLoading={this.state.ModalConfirmLoading}
                        onCancel={this.ModalHandleCancel.bind(this)}
                    >
                        <p>{this.state.ModalText}</p>
                        </Modal>
                        </Link>
                        </div>
                </div>
        );
    }

    ModalHandleOk = () => {
        this.setState({
            ModalText: '保存成功正在跳转',
            ModalConfirmLoading: true,
        });
        this.forceUpdate();
        setTimeout(() => {
            this.setState({
                ModalVisible: false,
                ModalConfirmLoading: false,
            });
        }, 2000);

    };

    ModalHandleCancel = () => {
        //console.log('Clicked cancel button');
        this.setState({
            ModalVisible: false,
        });
    };
    _onTitleChange(e) {
        //console.log(this.state.title)
        this.setState({
            title: e.target.value
        })
    }
}


export default DraftEditor
export { contenttable }