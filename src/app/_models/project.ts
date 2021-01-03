export interface IProject{
  id?: number | null;
  projectName: string;
  projectDescription: string;
  clientCompany: string;
  projectLeader: string;
  isCurrent: boolean;
  projectPhase: ProjectPhase;
  contingencyLimit: number;
}

export class Project implements IProject{
  id?: number | null;
  projectName: string;
  projectDescription: string;
  clientCompany: string;
  projectLeader: string;
  isCurrent: boolean;
  projectPhase: ProjectPhase;
  contingencyLimit: number;
}

// export class ProjectPhaseRequest {

//   constructor(public id: number, public activeProjectPhase: ProjectPhase){
//   }
// }

export enum ProjectPhase
{
  Initiating = 'Initiating',
  InitiatingAuthorized = 'InitiatingAuthorized',
  Planning = 'Planning',
  ExecutionMonitoringControlling = 'ExecutionMonitoringControlling',
  Closed = 'Closed',
  Aborted = 'Aborted'
}
