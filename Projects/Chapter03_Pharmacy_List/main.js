import React from 'react';
import { render } from 'react-dom';

import pharmacies from './pharmacies.json';

class PharmacyListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pharmacies: this.props.pharmacies,
            filtered_pharmacies: this.props.pharmacies
        };

        this.onChange = this.onChange.bind(this);
    }

    static buildPharmacyString(pharmacy) {
        let pharmacyStringList = [];

        pharmacyStringList.push(pharmacy.name !== null ? pharmacy.name : " ");

        if(pharmacy.location !== null) {
            pharmacyStringList.push(pharmacy.location.street !== null ? pharmacy.location.street : "");
            pharmacyStringList.push(pharmacy.location.houseNr !== null ? pharmacy.location.houseNr : "");
            pharmacyStringList.push(pharmacy.location.zipCode !== null ? pharmacy.location.zipCode : "");
            pharmacyStringList.push(pharmacy.location.city !== null ? pharmacy.location.city : "");
        }

        return pharmacyStringList.join(" ").toLowerCase();
    }

    onChange() {
        let filtered_pharmacies = [];
        let searchString = document.getElementById("input").value.toLowerCase();

        for(let i in this.state.pharmacies) {
            const pharmacy = this.state.pharmacies[i];
            const pharmacyString = PharmacyListPage.buildPharmacyString(pharmacy);

            let position = pharmacyString.indexOf(searchString);
            if(position !== -1) {
                filtered_pharmacies.push(pharmacy);
            }
        }
        this.setState({
            filtered_pharmacies: filtered_pharmacies
        });
    }

    render() {
        return(
            <section>
                <h1 className="centeredHeading">Bitte w&auml;hlen Sie eine Apotheke</h1>
                <input id="input" className="roundedInput" placeholder="Name der Apotheke" onChange={this.onChange}/>
                <button className="roundedButton">In der N&auml;he suchen</button>
                <PharmacyList pharmacies={this.state.filtered_pharmacies}/>
            </section>
        );
    }
}

class PharmacyList extends React.Component {
    constructor(props) {
        super(props);
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
    (<PharmacyListPage pharmacies={pharmacies}/>),
    document.getElementById('app')
);