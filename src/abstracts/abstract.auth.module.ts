export type AccessToken = string;

export abstract class AbstractAuthModule<
  Credential = unknown,
  AuthInfo = unknown
> {
  public abstract signIn(
    credential: Credential
  ): Promise<{ data: AuthInfo; token: AccessToken }>;
  public abstract signOut(): Promise<void>;
  public abstract signUp(opts: any): Promise<void>;
  public abstract getToken(): Promise<AccessToken>;
  public abstract loadAuthInfo(): Promise<AuthInfo>;
}
