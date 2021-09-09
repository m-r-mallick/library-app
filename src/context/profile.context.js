import React, {
   createContext,
   useContext,
   useEffect,
   useReducer,
   useState,
} from "react";
import { getRoles } from "../misc/helpers";

const ProfileContext = createContext();

const DEFAULT_PROFILE = { user: null, password: null, roles: null };

const reducer = (state, action) => {
   switch (action.type) {
      case "LOGIN_ATTEMPT":
         return {
            user: action.payload.user,
            password: action.payload.password,
         };

      case "LOGOUT_ATTEMPT":
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

   useEffect(() => {
      if (isProfileLoaded && roles.length === 0) {
         console.log(`isProfileLoaded`, isProfileLoaded);
         getRoles(profile.user.username, profile.password, profile.user.id)
            .then((res) => setRoles(res))
            .catch(console.log(`somethingwrong...`));
      }
      dispatch({ type: "SET_ROLES", payload: roles });
   }, [isProfileLoaded, roles, profile.user, profile.password]);

   return (
      <ProfileContext.Provider value={{ profile, dispatch, isProfileLoaded }}>
         {children}
      </ProfileContext.Provider>
   );
};

export const useProfile = () => useContext(ProfileContext);

export default ProfileProvider;
