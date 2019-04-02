import React from "react"

class Square extends React.Component{

  render(){
    if(this.props.value === 1){
      return <td className="live-cell" onClick={this.props.onClick} key="s"> </td>      
    } 
    return (
      <td className="dead-cell" onClick={this.props.onClick} key="s"> </td>
    )
  }
}

export default Square