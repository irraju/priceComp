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
        showMonthEstimateOnSide: false
	    };
	    this.updatePerHour = this.updatePerHour.bind(this);
	    this.updateUnitPerHour = this.updateUnitPerHour.bind(this);
	    this.updatePerMonth = this.updatePerMonth.bind(this);
	    this.updateUnitPerMonth = this.updateUnitPerMonth.bind(this);
      this.updateMonthEstimateOrientation = this.updateMonthEstimateOrientation.bind(this);
  	}

	componentWillMount(props) {
  	    this.setState({
  	    	perHour: this.props.perHour,
  	    	unitPerHour: this.props.unitPerHour,
  	    	perMonth: this.props.perMonth,
  	    	unitPerMonth: this.props.unitPerMonth,
          showMonthEstimateOnSide: this.props.showMonthEstimateOnSide
  	    });
	}


  render(){

    var priceCompClasses = classNames({
      monthlyEstimateOnSide: this.state.showMonthEstimateOnSide,
      priceComp: true
    });

    var priceHourClasses = classNames({
      monthlyEstimateOnSameLine:this.state.showMonthEstimateOnSide
    });

    var durationClasses = classNames({
      duration: true,
      smaller: this.state.showMonthEstimateOnSide,
      up: this.state.showMonthEstimateOnSide && (this.state.perMonth?true:false),
      down: this.state.showMonthEstimateOnSide && (this.state.perMonth?false:true)
    });

    var monthClasses = classNames({
      hide: this.state.perMonth?false:true,
      approxMonthlyCost: true,
      onSide: this.state.perMonth && this.state.showMonthEstimateOnSide
    });

    var  perHourCost = this.state.perHour;
    var priceDuration = '/hour', approxMonthCost = this.state.perMonth;

    if(this.state.perMonth == 0 && this.state.perHour == 0){
        perHourCost = 'price';
        priceDuration = '¢/hour';
        approxMonthCost = '-.-';
    }

    return (
      <div className="center" align="center">
        <div className="container">
          <div className= {priceCompClasses}>
            <div className={priceHourClasses}>
              <sup className="unitPerHour">{this.state.unitPerHour}</sup>
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
            <InpSel name="showMonthEstimateOnSide" type="checkbox" ref="monthBySide" update={this.updateMonthEstimateOrientation} />
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

  updateMonthEstimateOrientation(e){
    this.setState({showMonthEstimateOnSide: e.target.checked});
  }

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
        	<input type="text" ref="inp" type={this.props.type} value={this.props.value}  name={this.props.name} onChange={this.props.update}></input>
        </div>
    );
  }
}

export default Price