export interface SessionData {
    id?:string;
    name: string;
    inicio: string;
    quorum: string;
    sessions_vereadores?: {}
  }
  
  export const InitialSessionRegister: SessionData = {
    name: "",
    inicio: "",
    quorum: "",
  };
  
  export interface VoteStatus {
    yes: number;
    no: number;
    nul: number;
  }
  