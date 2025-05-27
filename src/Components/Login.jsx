// src/components/SignUpOne.js
import { useState,useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser , logoutUser } from '../features/auth/authAction.js';
import { setLoading } from '../features/auth/authSlice.js';


export function SignUpOne() {
  const [isLogin, setIsLogin] = useState(true);
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    contact: '',
    password: '',
  });
  
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn, FullName } = useSelector((state) => state.auth);

  useEffect(() => {
  if (isLoggedIn) {
    setShow(false);
  }
}, [isLoggedIn]);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser(formData));
    }
  };

    if(isLoggedIn){
      dispatch(setLoading(false));
    }

  return (
    <> 
    
        <Modal show={show} onHide={handleClose} centered>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="font-bold text-xl text-gray-700">
                {isLogin ? 'Welcome Back!' : 'Create an Account'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
              <div className="text-center mb-3">
                <motion.h5
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600"
                >
                  {isLogin ? 'Log In' : 'Sign Up'}
                </motion.h5>
                <p className="text-sm text-gray-500">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="p-0 text-blue-500 font-semibold underline"
                  >
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </Button>
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}

              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <Form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
                      <Form.Group controlId="formFullName" className="mb-3">
                        <Form.Label className="text-gray-700">Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="FullName"
                          placeholder="Enter full name"
                          value={formData.FullName}
                          onChange={handleChange}
                          required
                          className="shadow-sm rounded-lg"
                        />
                      </Form.Group>
                      <Form.Group controlId="formContact" className="mb-3">
                        <Form.Label className="text-gray-700">Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="contact"
                          placeholder="Enter phone number"
                          value={formData.contact}
                          onChange={handleChange}
                          required
                          className="shadow-sm rounded-lg"
                        />
                      </Form.Group>
                    </>
                  )}
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label className="text-gray-700">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="shadow-sm rounded-lg"
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label className="text-gray-700">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="shadow-sm rounded-lg"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg"
                  >
                    {loading ? <Spinner animation="border" size="sm" /> : isLogin ? 'Log In' : 'Sign Up'}
                  </Button>
                </Form>
              </motion.div>
            </Modal.Body>
          </motion.div>
        </Modal>
      
    </>
  );
}
