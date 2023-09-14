import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from "../../store/actions/auth.actions";
import { selectUser } from "../../store/sagas/selectors";

interface LoginPageProps {
  setAuthenticated: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuthenticated }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    // Dispatch the login action with user's data
    dispatch(loginRequest(formData.name, formData.email));
  };

  // Assuming you have logic to handle user state changes
  React.useEffect(() => {
    if (user) {
      setAuthenticated(true);
    }
  }, [user, setAuthenticated]);

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
