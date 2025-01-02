import "./Component.css";
import { useState, useCallback } from "react";

const Content = () => {
  // Logic for password generator
  const [length, setLength] = useState(8); // This is used to set the length of the password
  const [includeSpecial, setIncludeSpecial] = useState(false); // This is used to include special characters in the password
  const [includeNumbers, setIncludeNumbers] = useState(false); // This is used to include numbers in the password
  const [password, setPassword] = useState(""); // This is used to set the password

  // Now we have to create a function that will generate the password. And we will create a reusable function which will be called when length, includeSpecial, or includeNumbers changes. For that reason, we will use the useCallback hook.
  const generatePassword = useCallback(() => {
    // First, we will create password variable which will be an empty string
    let pass = "";

    // Then we will create a variable called str which will have all the characters that we want to include in the password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // If includeSpecial or includeNumbers is true then we will add special characters and numbers to the str variable
    if (includeSpecial) str += "!@#$%^&*(){}/[]";
    if (includeNumbers) str += "0123456789";

    // Then we will loop through the str variable and add random characters to the pass variable until the length of the pass variable is equal to the length variable
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length)); // charAt() method returns the character at the specified index in a string
    }

    // Then we will set the pass variable to the password state
    setPassword(pass);
  }, [length, includeSpecial, includeNumbers]); // Callback method includes the function and the dependencies. If any of the dependencies change, the function will be called. The dependencies are passed as an array.

  // Basic HTML code for password generator
  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="input-group">
        <input
          type="text"
          id="password"
          value={password}
          placeholder="Your Password Here"
          readOnly
        />
        <button
          id="copy"
          onClick={() => {
            navigator.clipboard.writeText(password);

            if (password.length === 0) {
              alert("Password field is empty");
            } else {
              alert(`Password: ${password} has copied to clipboard`);
            }
          }}
        >
          Copy
        </button>
      </div>
      <div className="slider-group">
        <label>
          Password Length: <span id="lengthValue">{length}</span>
        </label>
        <input
          type="range"
          id="length"
          min="8"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div className="options">
        <label>
          <input
            type="checkbox"
            id="includeSpecial"
            checked={includeSpecial}
            onChange={(e) => setIncludeSpecial(e.target.checked)}
          />
          Include Special Characters
        </label>
        <label>
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
      </div>
      <button id="generate" onClick={generatePassword}>
        Generate Password
      </button>
    </div>
  );
};

export default Content;
