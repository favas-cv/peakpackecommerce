import React, { createContext, useState, useEffect } from 'react';

export const Usercontext = createContext();

function Userprovider({ children }) {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setuser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Usercontext.Provider value={{ user, setuser }}>
      {children}
    </Usercontext.Provider>
  );
}

export default Userprovider;
