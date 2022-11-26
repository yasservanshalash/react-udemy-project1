import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";


function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  }
  const addUserHandler = (event) => {
    event.preventDefault();

    if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
        setError({
            title: "Invalid Input",
            message: "Please enter a username and age (non-empty values)"
        });
        return;
    }
    if(+enteredAge < 1) {
        setError({
            title: "Invalid Input",
            message: "Age must be greater than 1"
        });
        return;
    }
    if(!error) {
        props.onAddUser(enteredUsername,enteredAge);
        setEnteredUsername("");
        setEnteredAge("");
    }

  };
  return (
    <>
       {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="userName">Username</label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={usernameChangeHandler}
          value={enteredUsername}
        />
        <label htmlFor="age">Age (Years)</label>
        <input
          type="number"
          name="age"
          id="age"
          onChange={ageChangeHandler}
          value={enteredAge}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </>
  );
}

export default AddUser;
