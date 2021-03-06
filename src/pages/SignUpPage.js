import { Component } from "react";
import axios from "axios";
import Input from "../components/Input";

class SignUpPage extends Component {
  state = {
    username: "",
    email: "",
    password: "", // we can have this set to empty just for reference
    passwordRepeat: "", // we can have this set to empty just for reference
    apiProgress: false,
    signUpSuccess: false,
    errors: {},
  };

  onChange = (event) => {
    const { id, value } = event.target; // destructuring the event.target into id and value
    
    const errorsCopy = {...this.state.errors} // when modifying a state object {errors}, we need to take a copy of it
    delete errorsCopy[id] // we then take out the corresponding id of the input (ie. id="username") 
    this.setState({
      // setting the state values of the "id's"
      [id]: value, // to the value from the onChange event (aka. user's input)
      errors: errorsCopy // we then update the state to only the input id's still showing an error
    });
  };

  submit = async (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    const body = {
      username,
      email,
      password,
    };
    this.setState({ apiProgress: true });
    try {
      await axios.post("/api/1.0/users", body);
      this.setState({ signUpSuccess: true });
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({ errors: error.response.data.validationErrors });
      }
      this.setState({ apiProgress: false });
    }
  };

  render() {
    let disabled = true;
    const { password, passwordRepeat, apiProgress, signUpSuccess, errors } =
      this.state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
    }

    let passwordMismatch =
      password !== passwordRepeat ? "Password mismatch" : "";

    return (
      <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
        {!signUpSuccess && (
          <form className="card mt-5" data-testid="form-sign-up">
            <div className="card-header">
              <h1 className="text-center">Sign Up</h1>
            </div>
            <div className="card-body">
              <Input
                id="username"
                label="Username"
                onChange={this.onChange}
                help={errors.username}
              />
              <Input
                id="email"
                label="E-mail"
                onChange={this.onChange}
                help={errors.email}
              />
              <Input
                id="password"
                label="Password"
                onChange={this.onChange}
                help={errors.password}
                type="password"
              />
              <Input
                id="passwordRepeat"
                label="Password Repeat"
                onChange={this.onChange}
                help={passwordMismatch}
                type="password"
              />
              <div className="text-center">
                <button
                  className="btn btn-primary"
                  onClick={this.submit}
                  disabled={disabled || apiProgress}
                >
                  {apiProgress && (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                  )}
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        )}
        {signUpSuccess && (
          <div className="alert alert-success mt-3">
            Please check your email to activate your account
          </div>
        )}
      </div>
    );
  }
}

export default SignUpPage;
