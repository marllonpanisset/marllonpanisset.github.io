import React, { Component } from 'react';
import data from './../data/news.json';

export default class Noticia extends Component {
    render() {
        return (
            <div className="wrapper">
                <h2>Notícias</h2>
                {data.map((news, index) =>
                    <div className="news" key={index}>
                        <span className="date">{news.date}</span>
                        <h3>{news.title}</h3>
                        <p>{news.paragraph}</p>
                    </div>
                )}
            </div>
        );
    }
}