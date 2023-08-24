import React, { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import styles from "../css/AddUser.module.css";
import ErrorModal from "./ErrorModal";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.onAddUserName(userName);
    if (userName.trim().length === 0 || userAge.trim().length === 0) {
      setError({
        title: "Input field is Empty",
        message: "Please enter values for Username and Age (non-empty values).",
      });
      return;
    }

    if (+userAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }

    props.onAddUser(userName, userAge);
    setUserName("");
    setUserAge("");
  };

  const handleUserNameInput = (event) => {
    setUserName(event.target.value);
  };

  const handleUserAgeInput = (event) => {
    setUserAge(event.target.value);
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onHandleError={handleError}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={userName}
            type="text"
            onChange={handleUserNameInput}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            value={userAge}
            type="number"
            onChange={handleUserAgeInput}
          />
          <Button type="submit" onClick={props.onHandleError}>
            Add User
          </Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
