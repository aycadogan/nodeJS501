import { useEffect, useState } from "react";
import {
  Block,
  Box,
  Heading,
  Form,
  Button,
  Notification,
} from "react-bulma-components";

const { Input, Field, Label } = Form;

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(undefined);
  const [confirmPassword, setConfirmPassword] = useState(undefined);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onChange = (event) => {
    if (event.target.id === "password") setPassword(event.target.value);
    if (event.target.id === "confirmPassword")
      setConfirmPassword(event.target.value);
  };

  const submit = () => {
    const body = { username, email, password };
    setIsLoading(true);
    fetch("http://localhost:8000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setStatus("success");
        setIsLoading(false);
      })
      .catch((err) => {
        setStatus("error");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if(password && confirmPassword){
      setDisabled(password !== confirmPassword)
    }

    return () => {
      setStatus("")
      setIsLoading(false)
    }
  }, [password, confirmPassword])

  return (
    <Box data-testid="signup-page">
    <Field>
        {status === "error" && (
          <Notification>
            <Heading>Error Signing Up!</Heading>
            Username and/or Email already exists
            <Button remove role="alertdialog" onClick={() => setStatus("")} />
          </Notification>
        ) }
        {status === "success" && (
          <Notification>
            <Heading>Signed Up Successfully</Heading>
            Click <a>here</a> to go to Login page
            <Button remove role="alertdialog" onClick={() => setStatus("")} />
          </Notification>
        ) }
        
        <Heading size={1}>Sign Up</Heading>
        <Label htmlFor="username">Username</Label>
        <Input id="username" type="text" onChange={(e) => setUsername(e.target.value)} />

        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />

        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" onChange={onChange} />

        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword" type="password" onChange={onChange} />

        <Block />

        <Button 
          className={`${isLoading && 'is-loading'}`}
          disabled={disabled || isLoading} 
          onClick={submit}
          color={'dark'}
        >
          Sign Up
        </Button>
        {isLoading && <span>Loading...</span>}
      </Field>
    </Box>
  );
};

export default SignUpPage;