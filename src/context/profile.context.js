import React, {
   createContext,
   useContext,
   useEffect,
   useReducer,
   useState,
} from "react";
import { getRoles } from "../misc/helpers";

const ProfileContext = createContext();

const DEFAULT_PROFILE = { user: null, password: null, roles: [] };

const reducer = (state, action) => {
   switch (action.type) {
      case "LOGIN_ATTEMPT":
         localStorage.removeItem("username");
         localStorage.removeItem("password");
         return {
            user: action.payload.user,
            password: action.payload.password,
         };

      case "LOGIN_AND_REMEMBER_ATTEMPT":
         localStorage.setItem("username", action.payload.user.username);
         localStorage.setItem("password", action.payload.password);
         return {
            user: action.payload.user,
            password: action.payload.password,
         };

      case "LOGOUT_ATTEMPT":
         localStorage.removeItem("username");
         localStorage.removeItem("password");
         return DEFAULT_PROFILE;

      case "SET_ROLES":
         return { ...state, roles: action.payload };

      default:
         return { ...state };
   }
};

const ProfileProvider = ({ children }) => {
   const [profile, dispatch] = useReducer(reducer, DEFAULT_PROFILE);
   const [roles, setRoles] = useState([]);
   const isProfileLoaded = profile.user !== null;
   const isRolesLoaded = profile.roles;

   useEffect(() => {
      if (isProfileLoaded && !isRolesLoaded) {
         getRoles(profile.user.username, profile.password, profile.user.id)
            .then((res) => setRoles(res))
            .catch(console.log(`somethingwrong...`));
      }
      dispatch({ type: "SET_ROLES", payload: roles });
   }, [profile.user, profile.password, isProfileLoaded, isRolesLoaded, roles]);

   return (
      <ProfileContext.Provider value={{ profile, dispatch, isProfileLoaded }}>
         {children}
      </ProfileContext.Provider>
   );
};

export const useProfile = () => useContext(ProfileContext);

export default ProfileProvider;
