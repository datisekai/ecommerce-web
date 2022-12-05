export interface PerList {
  id: number;
  name: string;
}

export interface Action {
  code: string;
  name: string;
  perListId: number;
  perList: PerList;
  perId: number;
  privilege: Privilege;
}

export interface Privilege {
  code: string;
  name: string;
  perList: number;
}
