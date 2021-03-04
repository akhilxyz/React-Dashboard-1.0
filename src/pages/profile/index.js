import axios from "axios";
import React, { Component } from "react";
import "./style.css";

class Profile extends Component {
  state = {
    name: "",
    email: "",
    company: "",
    phone: "",
    cover:
      "https://www.teahub.io/photos/full/254-2549402_background-facebook-cover-photo-size.jpg",
    avatar:
      "https://i.pinimg.com/564x/51/f6/fb/51f6fb256629fc755b8870c801092942.jpg",
    adminData: [],
  };
  componentDidMount() {
    let JWTToken = localStorage.getItem("Token");
    const url = "http://localhost:3003/api/admin/profile";
    axios.get(url, { headers: { Authorization: `Bearer ${JWTToken}` } }).then(
      (resp) => {
        if (resp.success === false) {
        } else {
          let data = JSON.stringify(resp.data);
          var values = [];
          JSON.parse(data, function (key, value) {
            if (typeof value != "object") {
              values.push({ [key]: value });
            }
          });
          this.setState({ adminData: values });
          this.state.adminData.map((it) => {
            if (it.name !== undefined) {
              this.setState({ name: it.name });
              localStorage.setItem("User", this.state.name);
            } else if (it.email !== undefined) {
              this.setState({ email: it.email });
            } else if (it.company !== undefined) {
              this.setState({ company: it.company });
            } else if (it.phone !== undefined) {
              this.setState({ phone: it.phone });
            }
          });
        }
      },
      (err) => {
        console.log("ERR");
      }
    );
  }

  render() {
    return (
      <div class="main-content">
        <div class="container mt-7">
          <div class="row">
            <div class="col-xl-8 m-auto order-xl-2 mb-5 mb-xl-0">
              <div class="card card-profile shadow">
                <div class="row justify-content-center">
                  <div class="col-lg-3 order-lg-2">
                    <div class="card-profile-image">
                      <a href="#">
                        <img src={this.state.avatar} class="rounded-circle" />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
                <div class="card-body pt-0 pt-md-4">
                  <div class="row">
                    <div class="col">
                      <div class="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                    </div>
                  </div>
                  <div class="text-center">
                    <h3>
                      {this.state.name}
                      <span class="font-weight-light"></span>
                    </h3>
                    <div class="h5 font-weight-300">
                      <i class="ni location_pin mr-2"></i>
                      {this.state.email}
                    </div>
                    <div class="h5 font-weight-300">
                      <i class="ni education_hat mr-2"></i>
                      {this.state.phone}
                    </div>
                    <div class="h5 mt-4">
                      <i class="ni business_briefcase-24 mr-2"></i>
                      {this.state.company}
                    </div>
                    <hr class="my-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
