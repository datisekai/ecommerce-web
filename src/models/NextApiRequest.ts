import { NextApiRequest } from "next";

export default interface INextApiRequest extends NextApiRequest {
  actions?:
    | {
        id: number;
        name: string;
        code: string;
        perListId: number;
        perId: number;
      }[]
    | any;
  userId?: string;
  perId?: number;
}
