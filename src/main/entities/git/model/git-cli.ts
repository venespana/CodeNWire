export enum GitCLIStatus {
  OK = 200,
  NOT_FOUND = 400,
  ERROR = 500,
}

export interface IGitCLI {
  health(): Promise<GitCLIStatus>;
}
