import React, { useContext, useState, useEffect, useRef } from "react";


const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const realmRef = useRef(null);
    const [projectData, setProjectData] = useState([]);
  
    useEffect(() => {
      if (!user) {
        return;
      }
  
      return () => {
        // cleanup function
        const userRealm = realmRef.current;
        if (userRealm) {
          userRealm.close();
          realmRef.current = null;
          setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
        }
      };
    }, [user]);
  
    // The signIn function takes an email and password and uses the
    // emailPassword authentication provider to log in.
    const signIn = async (email, password) => {
      const creds = Realm.Credentials.emailPassword(email, password);
      const newUser = await app.logIn(creds);
      setUser(newUser);
    };
  
    // The signUp function takes an email and password and uses the
    // emailPassword authentication provider to register the user.
    const signUp = async (email, password) => {
      await app.emailPasswordAuth.registerUser(email, password);
    };
  
    // The signOut function calls the logOut function on the currently
    // logged in user
    const signOut = () => {
      if (user == null) {
        console.warn("Not logged in, can't log out!");
        return;
      }
      user.logOut();
      setUser(null);
    };
  
    return (
      <AuthContext.Provider
        value={{
          signUp,
          signIn,
          signOut,
          user,
          projectData, // list of projects the user is a memberOf
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  // The useAuth hook can be used by components under an AuthProvider to
  // access the auth context value.
  const useAuth = () => {
    const auth = useContext(AuthContext);
    if (auth == null) {
      throw new Error("useAuth() called outside of a AuthProvider?");
    }
    return auth;
  };
  
  export { AuthProvider, useAuth };
  