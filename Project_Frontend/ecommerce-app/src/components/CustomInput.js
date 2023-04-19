import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname , state , setState} = props;
  return (
    <div>
      <input
        value={state[name]}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          setState({
            ...state,
            [name]: e.target.value
          })
        }}
        className={`form-control ${classname}`}
      />
    </div>
  );
};

export default CustomInput;
