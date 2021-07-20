import React, { Component } from 'react'
import axios from 'axios';
import Text from './components/Controls/Text';
import Output from './components/Output'
import Select from './components/Controls/Select';
//import { set } from 'harmony-reflect';

export default class App extends Component {
  constructor(props){
     super(props)
     this.state ={
       text :" ",
       paras: 4,
       html : 'html'
     }
  }
  componentWillMount(){
    this.getText();
  }
  changeParas(p){
    this.setState({
      paras: p
    },this.getText)
  }
   showHtml(x){
      this.setState({html: x}, this.getText);
  }
  getText()
  {
    //'https://baconipsum.com/api/?type=meat-and-filler&paras='+this.state.paras+'&format='+text
  
    axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras='+this.state.paras+'&format='+this.state.html).then((res)=>{
      this.setState({
        text:res.data
      },function (){
        console.log(this.state)
      })
    }).catch((err)=>
    {
      console.log(err);
    })
  }
  render() {
    return (
      <div className="App container">
        <h1 className="text-center">React text generator</h1>
         <form className="form-inline">
           <div className="form-group">
            <label>Paragraphs:</label>
           <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
          
           
           </div>
            <div className="form-group">
           <label>Format:</label>
           <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
            </div>
         </form>
         <Output value={this.state.text} />
       
      </div>
    )
  }
}
