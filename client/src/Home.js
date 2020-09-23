import React from "react";
import "./App.css";
import doctor from "./doctor.svg";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedfile: null,
      imgsrc: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      selectedfile: e.target.files[0],
    });
  };

  //UPLOAD HANDLER FUNCTION
  handleUpload = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    reader.readAsDataURL(this.state.selectedfile);

    reader.onload = (e) => {
      console.log(e.target.result);
      axios({
        url: "/api/uploadfile",
        method: "POST",
        data: this.state.selectedfile,
      })
        // .then((response) => {
        //   return response.json();
        // })
        .then((json) => {
          console.log(json);
          alert(json.data.prediction);
        });
    };
    fetch("/api", {
      methods: "POST",
      cache: "no-cache",
      headers: {
        content_type: "application/json",
      },
      body: JSON.stringify(this.state.value),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
      });
  };

  render() {
    return (
      <div className="row" id="mid">
        <div className="col-md-12 col-lg-6 mid-content">
          <p className="title">Dermado</p>
          <br></br>
          <p id="desc">AI-Powered Dermatology Assistant</p>
          <br></br>
          <input
            id="choosefile"
            type="file"
            onChange={this.handleChange}
          ></input>
          <br></br>
          <button
            name="upload"
            className="btn btn-lg"
            id="upload"
            onClick={this.handleUpload}
          >
            Upload IImage
          </button>
          <br></br>
          <img width="300px" src={this.state.imgsrc}></img>
        </div>
        <div className="col-md-12 col-lg-6" id="image-div">
          <img src={doctor} width="265px"></img>
        </div>
      </div>
    );
  }
}

export default Home;
