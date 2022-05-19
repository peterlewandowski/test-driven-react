import { Component } from "react";
import axios from "axios";

class SignUpPage extends Component {
  state = {
    username: "",
    email: "",
    password: "", // we can have this set to empty just for reference
    passwordRepeat: "", // we can have this set to empty just for reference
  };

  onChange = (event) => {
      const { id, value } = event.target; // destructuring the event.target into id and value
      this.setState({ // setting the state values of the "id's"
          [id]: value // to the value from the onChange event (aka. user's input)
      })
  }

  submit = (event) => {
    event.preventDefault()
    const { username, email, password } = this.state;
    const body = {
      username,
      email,
      password,
    };
    // axios.post("/api/1.0/users", body);
    fetch("/api/1.0/users", {
        method: 'POST',
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
  };

  render() {
    let disabled = true;
    const { password, passwordRepeat } = this.state;
    if (password && passwordRepeat) {
      disabled = password !== passwordRepeat;
    }
    return (
      <div>
        <form>
          <h1>Sign Up</h1>;<label htmlFor="username">Username</label>
          <input id="username" onChange={this.onChange} />
          <label htmlFor="email">E-mail</label>
          <input id="email" onChange={this.onChange} />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={this.onChange}
          />
          <label htmlFor="passwordRepeat">Password Repeat</label>
          <input
            id="passwordRepeat"
            type="password"
            onChange={this.onChange}
          />
          <button onClick={this.submit} disabled={disabled}>
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
