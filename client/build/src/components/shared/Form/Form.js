import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formType === "login") {
      handleLogin(e, email, password, role);
    } else if (formType === "register") {
      const registrationData = {
        email,
        password,
        phone,
      };
      if (role === "admin") {
        registrationData.name = name;
      } else {
        registrationData.name = name;
        registrationData.hospitalName = hospitalName;
        registrationData.website = website;
        //registrationData.address = address;
      }
      handleRegister(e, registrationData);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3 ms-4">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Donar
            </label>
          </div>
          <div className="form-check ms-3">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-3">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
        </div>

        {(() => {
          // eslint-disable-next-line default-case
          switch (true) {
            case formType === "login":
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            case formType === "register":
              return (
                <>
                  {(role === "donar") && (
                    <><InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)} />
                      <InputType
                        labelText={"Email"}
                        labelFor={"forEmail"}
                        inputType={"email"}
                        name={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                      <InputType
                      labelText={"Password"}
                      labelFor={"forPassword"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                      <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    />
                  </>
                 )}
                  {role === "admin" && (
                    <><InputType
                      labelText={"Organisation Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"Website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                   <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
                  )}
                  {role === "hospital" && (
                    <><InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                    <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"Website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                   <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
                  )}
                 
                </>
                 );
            
        }})()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registered yet? Register
              <Link to="/register"> Here! </Link> &nbsp;
            </p>
          ) : (
            <p>
              Already have an Account?
              <Link to="/login"> Login!</Link> &nbsp;
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
