import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AbstractAuthModule } from "../abstracts/abstract.auth.module";

type AuthDispatch<Credential = unknown, AuthInfo = unknown> = {
  signIn(credential: Credential): Promise<void>;
  signOut(): Promise<void>;
  signUp(opts: any): Promise<void>;
  loadAuthInfo(): Promise<AuthInfo>;
};

const AuthContext = createContext<any>(undefined);
const AuthDispatchContext = createContext<any>(undefined);

export function initializeAuthProvider<
  Credential = unknown,
  AuthInfo = unknown
>(authModule: AbstractAuthModule<Credential, AuthInfo>, initialData: AuthInfo) {
  const AuthProvider = (props: { children: ReactNode }) => {
    const [authData, setAuthData] = useState<AuthInfo>(initialData);
    const dispatch = useMemo<AuthDispatch<Credential, AuthInfo>>(() => {
      return {
        async signIn(credential) {
          const response = await authModule.signIn(credential);
          const { data } = response;
          setAuthData(data);
        },
        async loadAuthInfo() {
          const response = await authModule.loadAuthInfo();
          setAuthData(response);
          return response;
        },
        async signOut() {
          setAuthData(initialData);
        },
        async signUp(opts) {
          await authModule.signUp(opts);
        },
      };
    }, []);

    useEffect(() => {
      authModule.getToken().then(() => dispatch.loadAuthInfo());
    }, [dispatch]);

    return (
      <AuthContext.Provider value={authData}>
        <AuthDispatchContext.Provider value={dispatch}>
          {props.children}
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    );
  };
  function useAuthData() {
    const context = useContext<AuthInfo | undefined>(AuthContext);
    if (context === undefined) {
      throw new Error("Auth Provider를 초기화해주세요.");
    }
    return context;
  }
  function useAuthDispatch() {
    const context =
      useContext<AuthDispatch<Credential, AuthInfo> | undefined>(
        AuthDispatchContext
      );
    if (context === undefined) {
      throw new Error("Auth Provider를 초기화해주세요.");
    }
    return context;
  }

  return {
    AuthProvider,
    useAuthData,
    useAuthDispatch,
  };
}
