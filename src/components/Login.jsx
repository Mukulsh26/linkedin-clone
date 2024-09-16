import React, { useState, useContext } from 'react';
import AuthContext from '../authcontext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5; // Light background color for contrast
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  float: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: left;
  margin-bottom: 15px;
`;

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [otpError, setOtpError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Validate phone number
  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/; // 10 digits
    return regex.test(number);
  };

  // Validate OTP
  const validateOtp = (otp) => {
    const regex = /^[0-9]{4}$/; // 4 digits
    return regex.test(otp);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setPhoneNumberError('');
    setOtpError('');

    // Validate inputs manually if needed (if relying solely on patterns is insufficient)
    const phoneNumberPattern = /^[0-9]{10}$/;
    const otpPattern = /^[0-9]{4}$/;

    if (!phoneNumberPattern.test(phoneNumber)) {
      setPhoneNumberError('Phone number must be exactly 10 digits numbers');
      return;
    }
    if (!otpPattern.test(otp)) {
      setOtpError('OTP must be exactly 4 digits.');
      return;
    }

    // Proceed with login if validations pass
    if (login(phoneNumber, otp)) {
      navigate('/feed');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <Container style={{ position: 'relative', padding: '20px' }}>
      <img 
        style={{
          position: 'absolute', 
          top: '30px', 
          left: '30px', 
          width: '120px', 
          height: '70px'
        }} 
        src="/images/Linkedin-Logo.png" 
        alt="LinkedIn Logo" 
      />
      <Card>
        <Title>Sign in</Title>
        <p style={{ marginBottom: '30px', float: 'left' }}>Stay Updated for our professional world.</p>
        <form onSubmit={handleLogin}>
          <Input
            style={{ padding: '20px', borderRadius: '10px' }}
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          {phoneNumberError && <ErrorMessage>{phoneNumberError}</ErrorMessage>}
          <Input
            style={{ padding: '20px', borderRadius: '10px' }}
            type="tel"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="OTP"
          />
          {otpError && <ErrorMessage>{otpError}</ErrorMessage>}
          <Button 
            style={{ padding: '20px', borderRadius: '50px' }} 
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Card>
    </Container>
  );
}

export default Login;
