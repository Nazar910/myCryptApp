'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FileReaderInput from 'react-file-reader-input';
import fileDownload from'react-file-download';


const symbols = "?`~!@#$%^&*()_-=+/'\"\\;.:,0123456789 ";
const languages = {
    en: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" + symbols,
    ru: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя" + symbols,
    ua: "АБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгґдеєжзиіїйклмнопрстуфхцчшщьюя" + symbols
};


const App = React.createClass({
    getInitialState() {
        return {
            message: "",
            key: 1,
            cryptType: "tritemius",
            lang: languages["en"],
            message_array: [],
            intelliSearch: false
        }
    },

    onKeyChange() {
        if (!!this.refs.key.value.match(/^(-|)\d{1,4}t^2(\+|-)\d{1,4}t(\+|-)\d{1,4}$/)) {
            console.log('it is acceptable')
        } else if (!!this.refs.key.value.match(/^(|-)\d{1,4}t(\+|-)\d{1,4}$/)) {
            console.log('it is acceptable')
        } else if (!!this.refs.key.value.match(/^(|-)\d{1,4}t$/)) {
            console.log('it is acceptable')
        } else {
            console.log('it is acceptable')
        }
    },

    onTextAreaChange(event) {
        this.onMessageChange(event.target.value);
    },

    onMessageChange(str) {
        let flag = true;
        let symbol = '';
        for (let i = 0; i < str.length; i++) {
            if (!this.state.lang.includes(str[i])
                && !symbols.includes(str[i])) {
                symbol = str[i];
                flag = false;
                break;
            }
        }
        if (flag) {
            this.setState({message: str});
        } else {
            alert('Some symbols doesn\'t match to the selected language ' + symbol)
        }
    },

    encryptRequest() {
        this.onKeyChange();
        console.log(this.state.alphabet);
        axios.post('/api/' + this.state.cryptType + '/encrypt',
            {
                message: this.state.message,
                passphrase: this.refs.key.value,
                alphabet: this.state.lang,
                isIntelliSearch: this.state.intelliSearch
            })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                this.setState({message: data.message});
            });
    },

    decryptRequest() {
        this.onKeyChange();
        axios.post('/api/' + this.state.cryptType + '/decrypt',
            {
                message: this.state.message,
                passphrase: this.refs.key.value,
                alphabet: this.state.lang,
                isIntelliSearch: this.state.intelliSearch
            })
            .then((response) => {
                return response.data.message;
            })
            .then((message) => {
                if (message.constructor === Array) {
                    for (let i = 0; i < message.length; i++) {
                        let index = message[i].indexOf(' (key =');
                        message[i] = {
                            message: message[i].substring(0, index),
                            key: message[i].substring(index, data[i].length)
                        };
                        console.log(message[i]);
                    }
                    this.setState({message_array: message});
                } else {
                    this.setState({message: message});
                }
            });
    },

    onEncryptButton() {
        this.setState({
            cryptOption: "encrypt",
            intelliSearch: false
        });
    },

    onDecryptButton() {
        this.setState({
            cryptOption: "decrypt",
            intelliSearch: false
        });
    },

    onCryptTypeChange(event) {
        this.setState({cryptType: event.target.value.toLowerCase()});
    },

    onLangChange(event) {
        this.setState({lang: languages[event.target.value], message: ""});
    },

    onBruteForce() {
        this.setState({
            key: 0,
            brute_force: !this.state.brute_force,
            cryptOption: "decrypt"
        }, () => {
            this.decryptRequest()
        });

    },

    onBruteForceItemClick(newMessage) {
        console.log(newMessage);
        let index = newMessage.key.indexOf('= ');
        this.setState({
            message: newMessage.message,
            message_array: [],
            key: newMessage.key.substring(index + 2, newMessage.key.length - 1)
        });
        document.getElementById("close").click();
    },

    onIntelliSearchClick() {
        this.setState({intelliSearch: true});
    },

    handleFileChange(e, results){
        console.log(results);
        results.forEach((result) => {
            const [e, file] = result;
            if (file.name.slice(file.name.length - 4) !== '.txt') {
                alert('Only .txt files are confirmed');
                return;
            }
            let s = e.target.result;
            this.onMessageChange(s);
        });
    },

    handleFileSave() {
        fileDownload(this.state.message, 'encrypted-message.txt');
    },

    render() {
        return (
            <div>
                <div className="container">
                    <div className="header clearfix">
                        <nav>
                            <ul className="nav nav-pills pull-right">
                                <li><FileReaderInput as="text" id="my-file-input"
                                                     onChange={this.handleFileChange}>
                                    <button>Select a file!</button>
                                </FileReaderInput></li>
                                <li>
                                    <button onClick={this.handleFileSave}>Save</button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="jumbotron">
                    <textarea
                        className="form-control" value={this.state.message}
                        rows="5" id="comment" onChange={this.onTextAreaChange}
                    >
                    </textarea>
                        <div className="form-group" id="select">
                            {/*this.state.brute_force ?
                             <input
                             type="checkbox"
                             id="search"
                             title="intelliSearch"
                             onClick={this.onIntelliSearchClick}
                             value="i"
                             />
                             : ""*/}


                            <input
                                type="text" className="form-control"
                                id="key"
                                ref="key"
                            />
                            <br/><br/>
                            <select className="form-control" id="cipher" onChange={this.onCryptTypeChange}>
                                <option>Tritemius</option>
                                <option>Caesar</option>
                            </select>
                            <br/><br/>
                            <select className="form-control" id="lang" onChange={this.onLangChange}>
                                <option>en</option>
                                <option>ua</option>
                                <option>ru</option>
                            </select>
                        </div>
                        <div id="crypt">

                            <button
                                className="btn btn-lg btn-success"
                                onClick={this.encryptRequest}>
                                Encrypt
                            </button>
                            &nbsp;
                            <button
                                className="btn btn-lg btn-success"
                                onClick={this.decryptRequest}>
                                Decrypt
                            </button>

                            {/*<button*/}
                            {/*type="button"*/}
                            {/*className="btn btn-lg btn-success"*/}
                            {/*data-toggle="modal"*/}
                            {/*data-target="#myModal"*/}
                            {/*onClick={this.onBruteForce}>*/}
                            {/*Brute-force*/}
                            {/*</button>*/}


                            <div id="myModal" className="modal fade" role="dialog">
                                <div className="modal-dialog">

                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close"
                                                    data-dismiss="modal">&times;</button>
                                            <h4 className="modal-title"></h4>
                                        </div>
                                        <div className="modal-body">
                                            {this.state.message_array.map(message =>
                                                <p
                                                    key={message.key}
                                                    onClick={this.onBruteForceItemClick.bind(this, message)}
                                                >
                                                    {message.message}
                                                    {message.key}
                                                </p>)}
                                        </div>
                                        <div className="modal-footer">
                                            <button id="close" type="button" className="btn btn-default"
                                                    data-dismiss="modal">Close
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <footer className="footer">
                    <p>&copy; 2017 Nazarii Pyvovar, TR-41</p>
                </footer>
            </div>
        )
    }
});

export default App;