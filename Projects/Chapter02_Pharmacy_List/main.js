import React from 'react';
import { render } from 'react-dom';

import pharmacies from './pharmacies.json';

class PharmacyList extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.pharmacies);
    }

    render() {
        return(
            <ul className="noBulletList">
                {this.props.pharmacies.map(i => (
                        <li key={i.name}><Pharmacy pharmacy={i}/></li>
                    ))}
            </ul>
        );
    }
}

class Pharmacy extends React.Component {
    constructor(props) {
        super(props);

        const icon = (this.props.pharmacy.icon !== null ? this.props.pharmacy.icon : "");
        const name = (this.props.pharmacy.name !== null ? this.props.pharmacy.name : "");

        let street;
        let houseNr;
        let zipCode;
        let city;

        if(this.props.pharmacy.location !== null) {
            street = (this.props.pharmacy.location.street !== null ? this.props.pharmacy.location.street : "");
            houseNr = (this.props.pharmacy.location.houseNr !== null ? this.props.pharmacy.location.houseNr : "");
            zipCode = (this.props.pharmacy.location.zipCode !== null ? this.props.pharmacy.location.zipCode : "");
            city = (this.props.pharmacy.location.city !== null ? this.props.pharmacy.location.city : "");
        }

        this.state = {
            icon: icon,
            name: name,
            street:street,
            houseNr: houseNr,
            zipCode: zipCode,
            city: city
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.state.name);
    }

    render() {
        return (
            <div className="pharmacy" onClick={this.handleClick}>
                <img src={this.state.icon} className="pharmacyIcon"/>
                <div className="pharmacyInfo">
                    <p>{this.state.name}</p>
                    <p>{this.state.street} {this.state.houseNr}</p>
                    <p>{this.state.zipCode} {this.state.city}</p>
                </div>
            </div>
        );
    }
}

render(
  <section>
      <h1 className="centeredHeading">Bitte w&auml;hlen Sie eine Apotheke</h1>
      <input className="roundedInput" placeholder="Name der Apotheke"/>
      <button className="roundedButton">In der N&auml;he suchen</button>
      <PharmacyList pharmacies={pharmacies}/>
  </section>,
  document.getElementById('app')
);
