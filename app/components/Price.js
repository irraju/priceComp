import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';


class Price extends React.Component {

	constructor(){
	    super();
	    this.state = {
	    	perHour: 0,
	    	unitPerHour: "$",
			perMonth: null,
			unitPerMonth: "$"
	    };
	    this.updatePerHour = this.updatePerHour.bind(this);
	    this.updateUnitPerHour = this.updateUnitPerHour.bind(this);
	    this.updatePerMonth = this.updatePerMonth.bind(this);
	    this.updateUnitPerMonth = this.updateUnitPerMonth.bind(this);
  	}


	// <div class="content">
	// 	<p class="price">
	// 	    <sup>{this.state.unitPerHour}</sup>
	// 	    <span>{this.state.perHour}</span>
	// 	    <sub>/hour</sub>
	// 	</p>
	// 	<p class="perMonth">approx {this.state.unitPerMonth}{this.state.perMonth} /month</p>
	// </div>


	componentWillMount(props) {
  	    this.setState({
  	    	perHour: this.props.perHour,
  	    	unitPerHour: this.props.unitPerHour,
  	    	perMonth: this.props.perMonth,
  	    	unitPerMonth: this.props.unitPerMonth
  	    });
	}


  render(){

    var monthClasses = classNames({
		hide: this.state.perMonth?false:true,
		approxCostMonth: true
		});

    return (
      <div className="center" align="center">
        <div className="container">
          <div className="price">
            <p>
              <sup>{this.state.unitPerHour}</sup>
              <span className="costPerHour">{this.state.perHour}</span>
              <sub>/hour</sub>
            </p>
            <p className={monthClasses}>approx {this.state.unitPerMonth}<b>{this.state.perMonth}</b>/month</p>
          </div>
          <hr />
          <div className="setters">
            <InpSel name="unitPerHour" ref="unitPerHour" update={this.updateUnitPerHour} />
            <InpSel name="perHour" ref="perHour"  update={this.updatePerHour} />
            <InpSel name="perMonth" ref="perMonth" update={this.updatePerMonth} />
            <InpSel name="unitPerMonth" ref="unitPerMonth" update={this.updateUnitPerMonth} />
          </div>
        </div>
      </div>
    );
  }

  update(e){
    // this.setState({
    //   perHour: ReactDOM.findDOMNode(this.name="" refs.perHour.name="" refs.inp).value,
    //   unitPerHour: ReactDOM.findDOMNode(this.name="" refs.unitPerHour.name="" refs.inp).value,
    //   perMonth: ReactDOM.findDOMNode(this.name="" refs.perMonth.name="" refs.inp).value,
    //   unitPerMonth: ReactDOM.findDOMNode(this.name="" refs.unitPerMonth.name="" refs.inp).value

    // })
  }

  updatePerHour(e){
  	    this.setState({perHour: e.target.value})
  }

  updateUnitPerHour(e){
    this.setState({unitPerHour: e.target.value})

  }

  updatePerMonth(e){
    this.setState({perMonth: e.target.value})

  }

  updateUnitPerMonth(e){
    this.setState({unitPerMonth: e.target.value})

  }


  //  render(){
  //  	return (

		// <div class="content">
		// 	<p class="price">
		// 	    <sup>{this.state.unitPerHour}</sup>
		// 	    <span>{this.state.perHour}</span>
		// 	    <sub>/hour</sub>
		// 	</p>
		// 	<p class="perMonth">approx {this.state.unitPerMonth}{this.state.perMonth} /month</p>
		// </div>
  // 	)
  //  }
}


Price.propTypes = {
  perHour: React.PropTypes.number.isRequired,
  unitPerHour: React.PropTypes.string,
  perMonth: React.PropTypes.number,
  unitPerMonth: React.PropTypes.string,
  cssClass: React.PropTypes.string

}

Price.defaultstate = {
		unitPerHour: "$",
		perMonth: null,
		unitPerMonth: "$",
}

class InpSel extends React.Component {
  render(){
    return (
        <div>
        	{this.props.name}:<br/>
        	<input name="" ref="inp" type="text"  name={this.props.name} onChange={this.props.update}>{this.props.a}</input>
        </div>
    );
  }
}



export default Price