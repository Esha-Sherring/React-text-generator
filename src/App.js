import React, { Component } from 'react'
import axios from 'axios';
import Text from './components/Controls/Text';
import Output from './components/Output'
import Select from './components/Controls/Select';
import './App.css';
//import { set } from 'harmony-reflect';

export default class App extends Component {
  constructor(props){
     super(props)
     this.state ={
       text :" ",
       paras: 6,
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
      <div  className="App" >
      <div  style={{margin:"1rem",padding:"2rem"}} className="App container">
        <h1 className="text-center">React text generator</h1>
        <div style={{margin:"1 rem",marginBottom:"1rem"}}>
           <form  className="form-inline">
           <div className="form-group">
          <label>Paragraphs:</label>
           <Text value={this.state.paras} onChange={this.changeParas.bind(this)}/>
           </div>
            <div className="form-group">
           <label>Format:</label>
           <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
            </div>
         </form>
        </div>
         
         <div  style={{backgroundColor:"white", textAlign:"justify",padding:"1rem",margin:"1 rem"}} className="output">
            <Output  value={this.state.text} /> 
         </div>
         
       
      </div>
      </div>
      
    )
  }
}
