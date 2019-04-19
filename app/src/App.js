import React, { Component } from 'react';
import {  Route } from 'react-router-dom';
import Header from './layout/Header.js';
import Footer from './layout/Footer.js';
import './App.css';
import Home from './pages/Home';
import SobreMim from './pages/Sobre-Mim';
// import Mensagem from './pages/Mensagem';
import Contato from './pages/Contato';
import Noticia from './pages/Noticia';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <div className="content">
            <Route path="/" exact component={Home} />
            <Route path="/sobre-mim" exact component={SobreMim} />
            <Route path="/contato" exact component={Contato} />
            <Route path="/noticia/:id" exact component={Noticia} />
            {/* <Route path="/contato/send" component={Mensagem} /> */}
          </div>
          <Footer />
      </div>
    );
  }
}

export default App;
