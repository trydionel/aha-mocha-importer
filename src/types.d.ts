interface WebhookRequest {
  headers: MochaHeaders;
  payload: MochaPayload;
}

interface MochaHeaders {
  "X-Mocha-Branch": string;
  "X-Mocha-Environment": string;
  [key:string]: string
}

interface MochaPayload {
  stats: MochaStats;
  tests: MochaTestResult[];
  pending: MochaTestResult[];
  failures: MochaTestResult[];
  passes: MochaTestResult[];
}

interface MochaStats {
  suite: number;
  tests: number;
  passes: number;
  pending: number;
  failures: number;
  start: string;
  end: string;
  duration: number
}

interface MochaTestResult {
  title: string;
  fullTitle: string;
  file: string;
  duration: number;
  currentRetry: number;
  speed: number;
  err: any;
}

interface TestResult extends MochaTestResult {
  timestamp: string;
  branch?: string;
  environment?: string;
}

interface TestRun {
  timestamp: string;
  branch?: string;
  environment?: string;
}

interface ReferenceDescriptor {
  typename: "Epic" | "Feature" | "Requirement";
  id: string;
}