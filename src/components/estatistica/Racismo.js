import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebaseApp from '../../utils/firebaseUtils';
import TipoDeEstatistica from './TipoDeEstatistica';

export default class Racismo extends Component {
  constructor(props) {
    super(props);
    this.state = { id: props.id, totalDeDenunciaPorRacismo: '0' };
  }

  componentDidMount() {
    const ref = firebaseApp.database().ref();
    ref.child('denuncias').orderByChild('idCategoria').equalTo('racismo')
      .once('value', (snapshot) => {
        this.setState({ totalDeDenunciaPorRacismo: snapshot.numChildren() });
      });
  }

  render() {
    return (<TipoDeEstatistica
      id={this.state.id}
      numero={this.state.totalDeDenunciaPorRacismo}
      categoria="Racismo"
    />);
  }
}

Racismo.propTypes = {
  id: PropTypes.string.isRequired
};
