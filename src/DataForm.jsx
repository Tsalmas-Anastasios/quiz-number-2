import { InputField } from "./InputField.jsx";
import { useState, useRef } from "react";

export default function DataForm(props) {
  const [errors, setErrors] = useState({
    nameError: null,
    usernameError: null,
    emailError: null,
    cityError: null,
    zipcodeError: null,
    phoneError: null,
    isValid: null,
  });

  const initialUserData = {
    name: "",
    username: "",
    email: "",
    city: "",
    zipcode: "",
    phone: "",
  };

  const [userData, setUserData] = useState(initialUserData);

  //refs used for focus after submit (with or with out errors)
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const cityRef = useRef(null);
  const zipcodeRef = useRef(null);
  const phoneRef = useRef(null);

  function hadleOnChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();
    let newErrorsObj = validateForm(userData);
    setErrors({ ...newErrorsObj })

    if (newErrorsObj.isValid) {
      console.log("all good valid");
      //proceed with submission
      submitFormData(userData);
      //empty form fields
      setUserData(initialUserData);
      //focus on first input field
      nameRef.current.focus();
    }
    else {
      console.log("error valid");
    }
  }

  function validateForm(userData) {

    //new errors obj(can mutate it) to use it on setErrors
    let newErrors = { nameError: false, usernameError: false, emailError: false, cityError: false, zipcodeError: false, phoneError: false, isValid: true, };

    // asume the correct phone number has exact 10digits
    const regXphone = /^\d{10}$/;
    if (!regXphone.test(userData.phone)) {
      newErrors.phoneError = true;
      newErrors.isValid = false;
      phoneRef.current.focus();
    }

    //zipcode input should contain only digits or a hyphen
    //(actually star-end with digit and includes digits with 0|1 hyphen)
    const regXzipcode = /^\d+[-]?\d+$/;
    if (!regXzipcode.test(userData.zipcode)) {
      newErrors.zipcodeError = true;
      newErrors.isValid = false;
      zipcodeRef.current.focus();
    }

    //city input should contains only letters
    const regXcity = /^[A-z]+$/;
    if (!regXcity.test(userData.city)) {
      newErrors.cityError = true;
      newErrors.isValid = false;
      cityRef.current.focus();
    }

    if (!userData.email.includes("@")) {
      newErrors.emailError = true;
      newErrors.isValid = false;
      emailRef.current.focus();
    }

    if (userData.username.length < 5) {
      newErrors.usernameError = true;
      newErrors.isValid = false;
      usernameRef.current.focus();
    }

    if (userData.name.length < 5) {
      newErrors.nameError = true;
      newErrors.isValid = false;
      nameRef.current.focus();
    }

    return newErrors;

  }

  async function submitFormData(data) {
    console.log("on submitFormData()");
    let sendingData = {
      name: data.name,
      username: data.username,
      email: data.email,
      address: { city: data.city, zipcode: data.zipcode },
      phone: data.phone
    };

    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify(sendingData),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if (!response.ok) {
        throw new Error("Sorry something went wrong");
      }
      // read response body as json
      let newUser = await response.json();

      //add new user(json format) to DOM
      props.setUsers([...props.users, newUser]);
    }
    catch (error) {
      alert(error.message);
    }
    console.log("create new User with out errors");
  }

  return (
    <form className="crud-form" name="DataForm" onSubmit={submitForm} action="" method="" noValidate>
      <InputField name="name" type="text" error={errors.nameError} onChange={hadleOnChange} value={userData.name} ref={nameRef} />
      <InputField name="username" type="text" error={errors.usernameError} onChange={hadleOnChange} value={userData.username} ref={usernameRef} />
      <InputField name="email" type="email" error={errors.emailError} onChange={hadleOnChange} value={userData.email} ref={emailRef} />
      <InputField name="city" type="text" error={errors.cityError} onChange={hadleOnChange} value={userData.city} ref={cityRef} />
      <InputField name="zipcode" type="text" error={errors.zipcodeError} onChange={hadleOnChange} value={userData.zipcode} ref={zipcodeRef} />
      <InputField name="phone" type="text" error={errors.phoneError} onChange={hadleOnChange} value={userData.phone} ref={phoneRef} />
      <div className="form-row">
        <button name="submitButton">Save</button>
      </div>
    </form>
  );
}