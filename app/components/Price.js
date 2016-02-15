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
        unitPerMonth: "$",
        cssClass: null
	    };
	    this.updatePerHour = this.updatePerHour.bind(this);
	    this.updateUnitPerHour = this.updateUnitPerHour.bind(this);
	    this.updatePerMonth = this.updatePerMonth.bind(this);
	    this.updateUnitPerMonth = this.updateUnitPerMonth.bind(this);
      this.updateCssClass = this.updateCssClass.bind(this);
  	}

	componentWillMount(props) {
  	    this.setState({
          perHour: this.props.perHour,
          unitPerHour: this.props.unitPerHour?this.props.unitPerHour:"$",
          perMonth: this.props.perMonth,
          unitPerMonth: this.props.unitPerMonth?this.props.unitPerMonth:"$",
          cssClass: this.props.cssClass
  	    });
	}

  hideMonthlyEstimate(){
    if(this.state.perMonth === 0){
      // Special case where all instance types are selected
      // and variant with no values have to be shown
      return false;
    }else if(typeof this.state.perMonth === "undefined" ||!this.state.perMonth.length){
      //perMonth is not set or has been made empty string in input text fields
      return true;
    }
  }


  render(){

    var priceCompClasses = "priceComp";
    if(this.state.cssClass) priceCompClasses = priceCompClasses+" "+this.state.cssClass;

    var durationClasses = classNames({
      duration: true,
      up: this.state.perMonth?true:false,
      down: this.state.perMonth?false:true
    });

    var monthClasses = classNames({
      hide: this.hideMonthlyEstimate(),
      approxMonthlyCost: true,
    });

    var perHourCost = this.state.perHour;
    var unitPerHour = this.state.unitPerHour;
    var priceDuration = '/hour', approxMonthCost = this.state.perMonth;

    if(this.state.perMonth == 0 && this.state.perHour == 0){
        unitPerHour = '';
        perHourCost = 'price';
        priceDuration = '¢/hour';
        approxMonthCost = '-.-';
    }

    return (
      <div className="center" align="center">
        <div className="container">
          <div className= {priceCompClasses}>
            <div className="pricePerUnit">
              <sup className="unitPerHour">{unitPerHour}</sup>
              <span className="costPerHour">{perHourCost}</span>
              <sub className={durationClasses}>{priceDuration}</sub>
            </div>
            <div className={monthClasses}>approx {this.state.unitPerMonth}<b>{approxMonthCost}</b>/month</div>
          </div>
          <hr />
          <div className="setters">
            <InpSel name="unitPerHour" type="text" ref="unitPerHour" update={this.updateUnitPerHour} />
            <InpSel name="perHour" type="text" ref="perHour"  update={this.updatePerHour} />
            <InpSel name="perMonth" type="text" ref="perMonth" update={this.updatePerMonth} />
            <InpSel name="unitPerMonth" type="text" ref="unitPerMonth" update={this.updateUnitPerMonth} />
            <InpSel name="showMonthlyEstimateOnSide" type="checkbox" ref="monthBySide" update={this.updateCssClass} />
          </div>
        </div>
      </div>
    );
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

  updateCssClass(e){
    this.setState({cssClass: e.target.checked?"showMonthlyEstimateOnSide":null})
  }

}


Price.propTypes = {
  perHour: React.PropTypes.number.isRequired,
  unitPerHour: React.PropTypes.string,
  perMonth: React.PropTypes.number,
  unitPerMonth: React.PropTypes.string,
  cssClass: React.PropTypes.string

}

Price.defaultPropsData = {
		unitPerHour: "$",
		perMonth: null,
		unitPerMonth: "$",
}

class InpSel extends React.Component {
  render(){
    return (
        <div>
        	{this.props.name}:<br/>
        	<input type="text" ref="inp" type={this.props.type} value={this.props.value}  name={this.props.name} onChange={this.props.update}></input>
        </div>
    );
  }
}

export default Price