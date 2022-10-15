// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const test = async (req: NextApiRequest, res: NextApiResponse) => {
  // const examples = await prisma.user.create({
  //   data: { name: "Datisekai", email: "dat@gmail.com", image: "image ne" },
  // });
  const examples = await prisma.user.findMany({
    where: {
      email: "dat@gmail.com",
    },
  });
  res.status(200).json(examples);
};

export default test;

// const info = {
//   product_id: 1,
//   variants: [
//     {
//       id: 1,
//       name: "size",
//       options: [
//         {
//           id: 1,
//           name: "small",
//         },
//         {
//           id: 2,
//           name: "large",
//         },
//       ],
//     },
//     {
//       id: 2,
//       name: "color",
//       options: [
//         {
//           id: 3,
//           name: "red",
//         },
//         {
//           id: 4,
//           name: "blue",
//         },
//       ],
//     },
//   ],
// };
