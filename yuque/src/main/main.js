import React from 'react';

import Bar from './bar/tabbar.js'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Collab, Collec, Doc, Fol, Group, Rct, Rep, Top, Trash, DraftEditor } from './view/view.js'
import { Card, Button, Affix, Empty } from 'antd'
import { Link } from 'react-router-dom';
import { contenttable } from './view/editor.js'

var passages = ['default']
class Main extends React.Component {
  constructor(props) { 
    super(props)
    this.state = {
      titleList: JSON.parse(localStorage.getItem('table')) ? JSON.parse(localStorage.getItem('table')) : [],
    }
    this.onClick = this.onClick.bind(this)
  }

  componentWillMount() {
    if (contenttable)
      setTimeout(() => {
        this.setState({
          titleList: contenttable
        })}, 1)
  }
  render() {
    const titleView = () => {
      if (this.state.titleList.length > 0)
        return (
          <div>
            {this.state.titleList.map(
              (item, key) => (
                <Card key={key} title={
                  <Link to={`/${item.repository}/${item.title}`}>
                    <Button style={{ border: 'none' }}>
                      <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{item.title}</span>
                    </Button>
                  </Link>
                }
                >
                  <span style={{ display: 'flex', justifyContent: 'space-between', padding: '0 1rem' }}>
                    <span>创建时间:{item.date}</span>
                    <span>repository:{item.repository}</span>
                  </span>
                </Card>)
            )}
          </div>
        )
      else { 
        return(
          <Empty />
        )
      }
    }
    return(
      <div className="main" >
        <Router>
          <div style={style.view}>
          
            <Affix offsetTop={120}>
              <Bar onClick={this.onClick} style={style.bar} />
              </Affix>
            <div style={style.component}>
              <Switch>
                {
                  this.state.titleList.map((item, index) => (
                    <Route key={index} path={`/${item.repository}/${item.title}`}
                      render={() => (<Doc repository={item.repository } title={item.title } />)}
                    />
                  ))
                }
                <Route path="/editor" render={() => (<DraftEditor display={false} displayPassage="" editable={true} />)} />
            <Route path="/repositories" component={Rep} />
            <Route path="/groups" component={Group} />
            
            <Route path="/collaborations" component={Collab} />
            <Route path="/topics" component={Top} />
            <Route path="/following" component={Fol} />
            <Route path="/collections" component={Collec} />
            <Route path="/recent" component={Rct} />

            <Route path="/trashbin" component={Trash} />
          
            <Route path="/" component={titleView}/>
            </Switch>
            </div>
            </div>
</Router>
      </div>
    )
  }
  onClick(e) { 
    console.log(e)
  }
}
const style = {
  view: {
    padding: '30px 15rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bar: {

  },
  component: {
    margin: '0 3rem',
    width: '50rem',
  }
}

export default Main;
