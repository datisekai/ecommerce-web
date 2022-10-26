import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

// const SwaggerUI = dynamic<{
//   spec: any;
// }>(import("swagger-ui-react"), { ssr: false });

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Ecommerce API",
        version: "1.0",
        description: "Đây là phần mô tả API web mua sắm trực tuyến",
        abc: "abc",
      },
      components: {
        schemas: {
          User: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                example: "Thanh Dat",
              },
              email: {
                type: "string",
                example: "datly@gmail.com",
              },
              avatar: {
                type: "string",
                example:
                  "https://res.cloudinary.com/do8rqqyn4/image/upload/v1647243597/hkvyhdjvvgeultcx7cv2.webp",
              },
              isActive: {
                type: "boolean",
                example: true,
              },
              phone: {
                type: "string",
                example: "0886249022",
              },
              password: {
                type: "string",
                example: "abcxyz",
              },
              nameShop: {
                type: "string",
                example: "Shop Thanh Dat",
              },
              gender: {
                type: "string",
                example: "Nam",
              },
              date: {
                type: "datetime",
                example: 1666754152407,
              },
              perId: {
                type: "integer",
                example: 1,
              },
            },
            required: ["phone", "password"],
          },
        },
      },
      paths: {
        "/api/register": {
          post: {
            tags: ["User"],
            summary: "Đăng ký tài khoản người dùng",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
              required: true,
            },
            responses: {
              "200": {
                description: "Đăng ký tài khoản thành công",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
              "404": {
                description: "Đăng ký tài khoản thất bại",
              },
              "500": {
                description: "Internal server",
              },
            },
          },
        },
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
