import React from "react";
import './Track.css';

class Track extends React.Component{
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction(){
        let btnVal = this.props.isRemoval ? "-" : "+";
        if (btnVal === "+"){
            return <button className="Track-action" onClick={this.addTrack}>{btnVal}</button>
        } else {
        return <button className="Track-action" onClick={this.removeTrack}>{btnVal}</button>;
        }
    }

    addTrack(){
        let newTrack = this.props.track;
        console.log("-- Track.js > addTrack() > newTrack is ", newTrack);
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        let trackToRemove = this.props.track;
        console.log("-- Track.js > removeTrack() > trackToRemove is ", trackToRemove);
        this.props.onRemove(this.props.track);
    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3> {this.props.track.name} </h3>
                    <p> {this.props.track.artist} | {this.props.track.album} </p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;