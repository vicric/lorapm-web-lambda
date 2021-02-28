export interface IProject{
  id?: number | null;
  projectName: string;
  projectDescription: string;
  clientCompany: string;
  projectLeader: string;
  isCurrent: boolean;
  activeProjectPhase: ProjectPhase;
  contingencyLimit: number;
}

export class Project implements IProject{
  id?: number | null;
  projectName: string;
  projectDescription: string;
  clientCompany: string;
  projectLeader: string;
  isCurrent: boolean;
  activeProjectPhase: ProjectPhase;
  contingencyLimit: number;
}

// export class ProjectPhaseRequest {

//   constructor(public id: number, public activeProjectPhase: ProjectPhase){
//   }
// }

export enum ProjectPhase
{
  Initiating = 0,
  InitiatingAuthorized = 1,
  Planning = 2,
  ExecutionMonitoringControlling = 3,
  Closed = 4,
  Aborted = 5
}
