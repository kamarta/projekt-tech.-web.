import { useState } from "react"; 

export const UpdateCustomerForm = ({onClick}) => {
    const [name, setName] = useState(""); 
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const message = (message) => {
      const messageElement = document.createElement("div");
      messageElement.textContent = message;
      document.body.appendChild(messageElement);
      messageElement.classList.add("info_message");
  
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 3000);
    };
  
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (name === "") {
          message("Please enter name");
          return;
        }
        if (surname === "") {
          message("Please enter surname");
          return;
        }
        if (!emailRegex.test(email)) {
          message("Please enter email adress in valid fromat");
          return;
        }
        if (phoneNumber === "" || phoneNumber.length !== 9) {
          message("Please enter 9-digit phone number");
          return;
        }

        onClick(name, surname, email, phoneNumber);
        setName("");
        setSurname("");
        setEmail("");
        setPhoneNumber("");
    };

    return (
      <form onSubmit={onSubmitHandler} className="form">
        <label className="form">Name</label>
        <input className="form" 
          placeholder="John"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label className="form">Surname</label>
        <input className="form"
          placeholder="Nowak"
          value={surname}
          onChange={(e) => setSurname(e.currentTarget.value)}
        />
        <label className="form">Email</label>
        <input className="form"
          placeholder="john@nowak.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label className="form">Phone number</label>
        <input className="form"
          placeholder="873 725 908"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.currentTarget.value)}
        />
        <button type="submit" className="form">Update</button>
      </form>
    );
    };