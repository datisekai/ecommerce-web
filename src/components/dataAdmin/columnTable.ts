export type IDataColumnTable = {
  id: string;
  name: string;
  width: string;
};
const columnTable: IDataColumnTable[] = [
  {
    id: "id",
    name: "ID",
    width: "75px",
  },
  {
    id: "name",
    name: "Tên sản phẩm",
    width: "300px",
  },
  {
    id: "sku",
    name: "SKU phân loại",
    width: "75px",
  },
  {
    id: "gia",
    name: "Giá",
    width: "100px",
  },
  {
    id: "soluong",
    name: "Số lượng",
    width: "100px",
  },
  {
    id: "Action",
    name: "Thao tác",
    width: "200px",
  },
];

export default columnTable;
