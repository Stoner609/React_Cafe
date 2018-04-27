import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

import TableExampleComplex from './TableExampleComplex'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cafeList: []
    }
    this.handleData = this.handleData.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    //https://cafenomad.tw/api/v1.2/cafes/
    //https://pacific-taiga-42083.herokuapp.com/cafe
    fetch(`https://pacific-taiga-42083.herokuapp.com/cafe?city=taipei`
      , { method: 'GET' }
    )
      .then(response => response.json())
      .then(json => {
        console.log('更新');
        this.setState({
          cafeList: json
        })
      });
  }

  handleData() {
    //console.log(this.state.cafeList);
  }

  render() {
    console.log('父層render');
    console.log(this.state.cafeList);

    const isLength = this.state.cafeList.length;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="My AppBar" />
          {isLength > 0 ? (
            <TableExampleComplex cafeList={this.state.cafeList}></TableExampleComplex>
          ) : (
            <div></div>
          )}
        </div>
      </MuiThemeProvider>
    )
  }
}


export default App;
