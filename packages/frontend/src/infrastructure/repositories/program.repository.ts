export interface ProgramRepository {
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  sourceCode: string;
  setSourceCode: (code: string) => void;
}
