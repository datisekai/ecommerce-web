export interface Action {
  id: number;
  code: string;
  perListId: number;
  perId: number;
}

export interface Permission {
  id: number;
  name: string;
  actions?: Action[];
}
