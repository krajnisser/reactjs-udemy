import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Location from './Location';
import transformWeather from './../../services/transformWeather';
import WeatherData from './WeatherData/index';
import './styles.css';
import getUrlWeatherByCity from '../../services/getURLWeatherByCity';

class WeatherLocation extends Component{

    constructor(props){

        super();
        const {city} = props;

        this.state = {
            city,
            data: null
        }
        console.log("constructor");

    }

    componentDidMount() {
        console.log("componentDidMount");
        this.handleUpdateClick();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
    }
    
    handleUpdateClick = () => {

        const api_weather = getUrlWeatherByCity(this.state.city);

        fetch(api_weather)
            .then(resolve => {
                return resolve.json();
            }).then(data => {
                const newWeather = transformWeather(data);
    
                this.setState({
                    data: newWeather
                });
            }).catch(err => {
                console.log('Error', err);
            });
    
        
        // console.log(this.state);
    }

    render(){
        
        const {onWeatherLocationClick} = this.props;
        const {city, data} = this.state;

        return(
        <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
            <Location city={city}/>
            {data ? <WeatherData data={data}/> : <CircularProgress/>}
            <h1>{this.saludo}</h1>
            {/* <button onClick={this.handleUpdateClick}>Actualizar</button> */}
        </div>
        );
    }

}

WeatherLocation.propTypes = {
    city: PropTypes.string,
    onWeatherLocationClick: PropTypes.func
}

export default WeatherLocation;