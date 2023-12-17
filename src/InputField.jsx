import { forwardRef } from "react";
import "./InputField.css";

export const InputField = forwardRef((props, ref) => {
    
    const errorMessages = {
        name: "Name should be more than 5 characters",
        username: "Username should be more than 5 characters",
        email: "Email should include @",
        city: "You must add a city",
        zipcode: "Zipcode must only be digits or a hyphen",
        phone: "You must add a phone number",
    };

    function toUpperCaseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="form-row">
                <label htmlFor={props.name} className="form-control__item">{toUpperCaseFirstLetter(props.name)}:</label>
                <input name={props.name} className={props.error ? "error-input" : ""} type={props.type} onChange={props.onChange} value={props.value} ref={ref} />
            </div>
            <div className="error-message">
                <p id={props.name + "Error"}>{props.error ? errorMessages[props.name] : ""}</p>
            </div>
        </>
    );
});