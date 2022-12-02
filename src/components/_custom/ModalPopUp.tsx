import React from "react";
import { IDataColumnTable } from "../data/columnTable";
type modal = {
  title: string;
  display: true | false;
  //   columnTable: IDataColumnTable[];
  //   rowTables: object[];
};
const ModalPopUp: React.FC<modal> = ({ title, display }) => {
  return <div className={`${!display && `hidden`}`}>ModalPopUp</div>;
};

export default ModalPopUp;
