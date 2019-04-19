import React, { Component } from 'react';
import data from './../data/news.json';

export default class Home extends Component {
    render() {
        return (
            <div className="wrapper">
                <h2>Notícias</h2>
                {data.map((news, index) =>
                    <div className="news" key={index}>
                        <span className="date">{news.date}</span>
                        <h3>{news.title}</h3>
                        <p>{news.paragraph}</p>
                        <a href={news.link}>Ler mais</a>
                    </div>
                )}
            </div>
        );
    }
}