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

const generateParam = (
  name: string,
  inWhere: string,
  description: string,
  required: boolean,
  type: string
) => {
  return {
    name,
    in: inWhere,
    description,
    required,
    schema: {
      type,
    },
  };
};

const security = {
  bearerAuth: {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
  Bearer: [1],
};

const responses = ($ref: any) => {
  return {
    "401": {
      $ref: "#/components/responses/unAuthorized",
    },
    "500": {
      $ref: "#/components/responses/internalServer",
    },
    "404": {
      $ref: "#/components/responses/notFound",
    },
    200: {
      content: {
        "application/json": {
          schema: {
            $ref,
          },
        },
      },
    },
  };
};

const requestBody = ($ref: string) => {
  return {
    content: {
      "application/json": {
        schema: {
          $ref,
        },
      },
    },
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Ecommerce API",
        version: "1.0",
        description: "Đây là phần mô tả API web mua sắm trực tuyến",
      },
      schemes: ["http", "https"],
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
      components: {
        securitySchemes: security,
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
          Permission: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                example: "Admin",
              },
            },
          },
          PermissionList: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                example: "Sản phẩm",
              },
            },
          },
          Action: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                example: "Cập nhật người dùng",
              },
              code: {
                type: "string",
                example: "admin:user:update",
              },
              perId: {
                type: "integer",
                example: 1,
              },
              perListId: {
                type: "integer",
                example: 1,
              },
            },
          },
          Privilege: {
            type: "object",
            properties: {
              code: {
                type: "string",
                example: "admin:user:update",
              },
              name: {
                type: "string",
                example: "Cập nhật người dùng",
              },

              perListId: {
                type: "integer",
                example: 1,
              },
            },
          },
          Contact: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              address: {
                type: "string",
                example: "Vo Thanh Trang, Tan Binh",
              },
              phone: {
                type: "string",
                example: "0886249022",
              },
              name: {
                type: "string",
                example: "Thanh Dat",
              },
              userId: {
                type: "integer",
                example: 1,
              },
            },
          },
          Category: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                example: "Thời Trang Nam",
                required: true,
              },
              parentId: {
                type: "integer",
                example: null,
              },
              sellerId: {
                type: "string",
                example: "cl9uz6mbg00027k2k2m8m5azm",
              },
              image: {
                type: "string",
                required: true,
                example:
                  "https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn",
              },
            },
          },
        },
        responses: {
          unAuthorized: {
            description: "Chưa đăng nhập",
          },
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
              permission: {
                type: "object",
                example: {
                  id: 3,
                  name: "Boss",
                },
              },
              actions: {
                type: "array",
                example: [
                  {
                    id: 1,
                    name: "Danh sách người dùng",
                    code: "admin:user:read",
                    perListId: 1,
                    perId: 3,
                  },
                  {
                    id: 2,
                    name: "Cập nhật người dùng",
                    code: "admin:user:update",
                    perListId: 1,
                    perId: 3,
                  },
                  {
                    id: 3,
                    name: "Xóa người dùng",
                    code: "admin:user:delete",
                    perListId: 1,
                    perId: 3,
                  },
                  {
                    id: 4,
                    name: "Cập nhật sản phẩm",
                    code: "admin:product:update",
                    perListId: 2,
                    perId: 3,
                  },
                  {
                    id: 5,
                    name: "Xóa sản phẩm",
                    code: "admin:product:delete",
                    perListId: 2,
                    perId: 3,
                  },
                ],
              },
              contacts: {
                type: "array",
                example: [
                  {
                    id: 1,
                    address: "Tan Binh",
                    phone: "0886249022",
                    name: "Datdz",
                    userId: 1,
                  },
                  {
                    id: 2,
                    address: "Vo Thanh Trang",
                    phone: "0886249022",
                    name: "Datdz",
                    userId: 1,
                  },
                ],
              },
            },
            required: ["phone", "password"],
          },
          internalServer: {
            description: "Server xảy ra lỗi",
          },
          Permission: {
            type: "array",
            example: [
              {
                id: 4,
                name: "Admin 1",
                actions: [],
              },
              {
                id: 3,
                name: "Boss",
                actions: [
                  {
                    id: 1,
                    name: "Danh sách người dùng",
                    code: "admin:user:read",
                    perListId: 1,
                    perId: 3,
                  },
                  {
                    id: 2,
                    name: "Cập nhật người dùng",
                    code: "admin:user:update",
                    perListId: 1,
                    perId: 3,
                  },
                  {
                    id: 3,
                    name: "Xóa người dùng",
                    code: "admin:user:delete",
                    perListId: 1,
                    perId: 3,
                  },
                  {
                    id: 4,
                    name: "Cập nhật sản phẩm",
                    code: "admin:product:update",
                    perListId: 2,
                    perId: 3,
                  },
                  {
                    id: 5,
                    name: "Xóa sản phẩm",
                    code: "admin:product:delete",
                    perListId: 2,
                    perId: 3,
                  },
                  {
                    id: 6,
                    name: "Thêm quyền",
                    code: "admin:permission:add",
                    perListId: 4,
                    perId: 3,
                  },
                  {
                    id: 7,
                    name: "Cập nhật quyền",
                    code: "admin:permission:update",
                    perListId: 4,
                    perId: 3,
                  },
                  {
                    id: 8,
                    name: "Xóa quyền",
                    code: "admin:permission:delete",
                    perListId: 4,
                    perId: 3,
                  },
                  {
                    id: 9,
                    name: "Xóa chức năng",
                    code: "admin:action:delete",
                    perListId: 4,
                    perId: 3,
                  },
                  {
                    id: 10,
                    name: "Thêm chức năng",
                    code: "admin:action:add",
                    perListId: 4,
                    perId: 3,
                  },
                  {
                    id: 11,
                    name: "Cập nhật chức năng",
                    code: "admin:action:update",
                    perListId: 4,
                    perId: 3,
                  },
                  {
                    id: 12,
                    name: "Cập nhật danh mục quyền",
                    code: "admin:permission-list:update",
                    perListId: 7,
                    perId: 3,
                  },
                  {
                    id: 13,
                    name: "Thêm danh mục quyền",
                    code: "admin:permission-list:add",
                    perListId: 7,
                    perId: 3,
                  },
                  {
                    id: 14,
                    name: "Xóa danh mục quyền",
                    code: "admin:permission-list:delete",
                    perListId: 7,
                    perId: 3,
                  },
                  {
                    id: 15,
                    name: "Xem danh mục quyền",
                    code: "admin:permission:read",
                    perListId: 4,
                    perId: 3,
                  },
                ],
              },
              {
                id: 2,
                name: "Người bán",
                actions: [],
              },
              {
                id: 1,
                name: "Người dùng",
                actions: [],
              },
            ],
          },
          notFound: {
            description: "Chưa đủ tham số",
          },
          PermissionList: {
            type: "array",
            example: [
              {
                id: 6,
                name: "Danh mục",
                actions: [],
              },
              {
                id: 7,
                name: "Danh mục quyền",
                actions: [
                  {
                    id: 12,
                    name: "Cập nhật danh mục quyền",
                    code: "admin:permission-list:update",
                    perListId: 7,
                  },
                  {
                    id: 13,
                    name: "Thêm danh mục quyền",
                    code: "admin:permission-list:add",
                    perListId: 7,
                  },
                  {
                    id: 14,
                    name: "Xóa danh mục quyền",
                    code: "admin:permission-list:delete",
                    perListId: 7,
                  },
                  {
                    id: 16,
                    name: "Xem danh mục quyền",
                    code: "admin:permission-list:read",
                    perListId: 7,
                  },
                ],
              },
            ],
          },
          Action: {
            type: "array",
            example: [
              {
                id: 1,
                name: "Danh sách người dùng",
                code: "admin:user:read",
                perListId: 1,
                perId: 3,
              },
              {
                id: 2,
                name: "Cập nhật người dùng",
                code: "admin:user:update",
                perListId: 1,
                perId: 3,
              },
            ],
          },
          Privilege: {
            type: "array",
            example: [
              {
                code: "admin:user:read",
                name: "Danh sách người dùng",
                perListId: 1,
              },
              {
                code: "admin:user:update",
                name: "Cập nhật người dùng",
                perListId: 1,
              },
            ],
          },
          Category: {
            type: "array",
            example: [
              {
                id: 1,
                name: "Thời Trang Nam",
                parentId: null,
                sellerId: null,
                image:
                  "https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn",
              },
            ],
          },
        },
      },
      paths: {
        "/api/register": {
          post: {
            tags: ["User"],
            summary: "Đăng ký tài khoản người dùng",
            parameters: [
              {
                name: "phone",
                in: "body",
                description: "Số điện thoại",
                required: true,
                schema: {
                  type: "string",
                },
              },
              {
                name: "password",
                in: "body",
                description: "Mật khẩu",
                required: true,
                schema: {
                  type: "string",
                },
              },
            ],
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/responses/User",
                  },
                },
              },
              required: true,
            },
            responses: responses("#/components/responses/User"),
          },
        },
        "/api/login": {
          post: {
            tags: ["User"],
            summary: "Đăng nhập người dùng",
            parameters: [
              generateParam("phone", "body", "Số điện thoại", true, "string"),
              generateParam("password", "body", "Mật khẩu", true, "string"),
            ],
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
                description: "Đăng nhập thành công",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        token: {
                          type: "string",
                          example:
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2ODU0NjY2LCJleHAiOjE2NjY4OTc4NjZ9.UmrV9cT9yiWfjeylaTQn_xCLeWQOyib9jkUyGs6yO40",
                        },
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Đăng nhập tài khoản thất bại",
              },
              "500": {
                description: "Internal server",
              },
            },
          },
        },
        "/api/user/me": {
          get: {
            tags: ["User"],
            summary: "Lấy thông tin của bản thân",
            security,
            responses: responses("#/components/responses/User"),
          },
        },
        "/api/user/{id}": {
          get: {
            tags: ["User"],
            summary: "Lấy thông tin người dùng theo id",
            security: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
            parameters: [
              {
                name: "id",
                in: "param",
                required: true,
                schema: {
                  type: "string",
                },
                description: "id người dùng",
              },
            ],
            responses: {
              "200": {
                description: "Lấy thông tin người dùng thành công",
                content: {
                  "applicastion/json": {
                    schema: {
                      $ref: "#/components/responses/User",
                    },
                  },
                },
              },
              "401": {
                $ref: "#/components/responses/unAuthorized",
              },
              "500": {
                $ref: "#/components/responses/internalServer",
              },
            },
          },
          put: {
            tags: ["User"],
            summary: "Cập nhật người dùng theo id",
            security: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
            parameters: [
              {
                name: "id",
                in: "param",
                required: true,
                schema: {
                  type: "string",
                },
                description: "id người dùng",
              },
            ],
            responses: {
              "200": {
                description: "Cập nhật người dùng thành công",
                content: {
                  "applicastion/json": {
                    schema: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                },
              },
              "401": {
                $ref: "#/components/responses/unAuthorized",
              },
              "500": {
                $ref: "#/components/responses/internalServer",
              },
            },
          },
          delete: {
            tags: ["User"],
            summary: "Xóa người dùng theo id",
            security: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
              },
            },
            parameters: [
              {
                name: "id",
                in: "param",
                required: true,
                schema: {
                  type: "string",
                },
                description: "id người dùng",
              },
            ],
            responses: responses("#/components/schemas/User"),
          },
        },
        "/api/permission": {
          get: {
            tags: ["Permission"],
            summary: "Lấy tất cả loại quyền",
            security,
            responses: responses("#/components/responses/Permission"),
          },
          post: {
            tags: ["Permission"],
            summary: "Thêm loại quyền",
            security,
            parameters: [
              generateParam("name", "body", "Tên loại quyền", true, "string"),
            ],
            requestBody: requestBody("#/components/schemas/Permission"),
            responses: responses("#/components/responses/Permission"),
          },
          put: {
            tags: ["Permission"],
            summary: "Cập nhật loại quyền",
            security,
            parameters: [
              generateParam("name", "body", "Tên loại quyền", true, "string"),
              generateParam("id", "query", "id quyền", true, "string"),
            ],
            requestBody: requestBody("#/components/schemas/Permission"),
            responses: responses("#/components/schemas/Permission"),
          },
          delete: {
            tags: ["Permission"],
            summary: "Xóa loại quyền",
            security,
            parameters: [
              generateParam("id", "query", "id loại quyền", true, "integer"),
            ],
            responses: responses("#/components/schemas/Permission"),
          },
        },
        "/api/permission-list": {
          get: {
            tags: ["Permission List"],
            summary: "Lấy các danh mục quyền",
            security,
            responses: responses("#/components/responses/PermissionList"),
          },
          post: {
            tags: ["Permission List"],
            summary: "Thêm danh mục quyền",
            security,
            responses: responses("#/components/schemas/PermissionList"),
            parameters: [
              generateParam(
                "name",
                "body",
                "Tên danh mục quyền",
                true,
                "string"
              ),
            ],
            requestBody: requestBody("#/components/schemas/PermissionList"),
          },
          put: {
            tags: ["Permission List"],
            summary: "Cập nhật danh mục quyền",
            security,
            responses: responses("#/components/schemas/PermissionList"),
            parameters: [
              generateParam(
                "name",
                "body",
                "Tên danh mục quyền",
                true,
                "string"
              ),
              generateParam(
                "id",
                "query",
                "id danh mục quyền",
                true,
                "integer"
              ),
            ],
            requestBody: requestBody("#/components/schemas/PermissionList"),
          },
          delete: {
            tags: ["Permission List"],
            summary: "Xóa danh mục quyền",
            security,
            responses: responses("#/components/schemas/PermissionList"),
            parameters: [
              generateParam(
                "id",
                "query",
                "id danh mục quyền",
                true,
                "integer"
              ),
            ],
          },
        },
        "/api/privilege": {
          get: {
            tags: ["Privilege"],
            summary: "Lấy các chức năng",
            security,
            responses: responses("#/components/responses/Privilege"),
          },
          post: {
            tags: ["Privilege"],
            summary: "Thêm chức năng",
            security,
            responses: responses("#/components/schemas/Privilege"),
            parameters: [
              generateParam("code", "body", "Code chức năng", true, "string"),
              generateParam("name", "body", "Tên chức năng", true, "string"),
              generateParam(
                "perListId",
                "body",
                "Mã danh mục quyền",
                true,
                "integer"
              ),
            ],
            requestBody: requestBody("#/components/schemas/Privilege"),
          },
          put: {
            tags: ["Privilege"],
            summary: "Cập nhật chức năng",
            security,
            responses: responses("#/components/schemas/Privilege"),
            parameters: [
              generateParam("name", "body", "Tên chức năng", false, "string"),
              generateParam("code", "body", "Code chức năng", false, "string"),
              generateParam(
                "perListId",
                "body",
                "Mã danh mục quyền",
                false,
                "integer"
              ),
            ],
            requestBody: requestBody("#/components/schemas/Privilege"),
          },
          delete: {
            tags: ["Privilege"],
            summary: "Xóa chức năng",
            security,
            responses: responses("#/components/schemas/Privilege"),
            parameters: [
              generateParam("code", "query", "code chức năng", true, "integer"),
            ],
          },
        },
        "/api/user": {
          get: {
            tags: ["User"],
            security,
            summary: "Lấy tất cả người dùng",
          },
        },
        "/api/user/contact": {
          post: {
            tags: ["User"],
            security,
            summary: "Thêm thông tin giao hàng",
            parameters: [
              generateParam("address", "body", "Địa chỉ", true, "string"),
              generateParam("phone", "body", "Số điện thoại", true, "string"),
              generateParam("name", "body", "Tên người nhận", true, "string"),
              generateParam("id", "query", "id người dùng", true, "integer"),
            ],
            requestBody: requestBody("#/components/schemas/Contact"),
            responses: responses("#/components/schemas/Contact"),
          },
          put: {
            tags: ["User"],
            security,
            summary: "Cập nhật thông tin giao hàng",
            parameters: [
              generateParam("address", "body", "Địa chỉ", false, "string"),
              generateParam("phone", "body", "Số điện thoại", false, "string"),
              generateParam("name", "body", "Tên người nhận", false, "string"),
              generateParam("id", "query", "id người dùng", true, "integer"),
            ],
            requestBody: requestBody("#/components/schemas/Contact"),
            responses: responses("#/components/schemas/Contact"),
          },
          delete: {
            tags: ["User"],
            security,
            summary: "Xóa thông tin giao hàng",
            parameters: [
              generateParam("id", "query", "id người dùng", true, "integer"),
            ],
            responses: responses("#/components/schemas/Contact"),
          },
        },
        "/api/category/view": {
          get: {
            tags: ["Category"],
            summary: "Lấy danh mục sản phẩm (cả người bán và admin)",
            responses: responses("#/components/responses/Category"),
            parameters: [
              generateParam("id", "query", "id người bán", false, "integer"),
            ],
            description:
              "Nếu có query id sẽ lấy theo người bán, nếu không sẽ lấy theo admin",
          },
        },
        "/api/category": {
          post: {
            tags: ["Category"],
            summary: "Thêm danh mục sản phẩm (cả người bán và admin)",
            description: "permission là admin | seller",
            security,
            requestBody: requestBody("#/components/schemas/Category"),
            parameters: [
              generateParam(
                "permission",
                "query",
                "admin | seller",
                true,
                "string"
              ),
              generateParam("name", "body", "Tên danh mục", true, "string"),
              generateParam("image", "body", "Ảnh danh mục", true, "string"),
              generateParam(
                "parentId",
                "body",
                "id danh mục cha -- nếu null thì danh mục này sẽ là cha",
                false,
                "integer"
              ),
              generateParam(
                "sellerId",
                "body",
                "id người bán -- nếu null thì danh mục này sẽ là cha",
                false,
                "string"
              ),
            ],
            responses: responses("#/components/schemas/Category"),
          },
          put: {
            tags: ["Category"],
            summary: "Cập nhật danh mục (cả người bán và admin)",
            description: "permission là admin | seller",
            security,
            requestBody: requestBody("#/components/schemas/Category"),
            responses: responses("#/components/schemas/Category"),
            parameters: [
              generateParam(
                "permission",
                "query",
                "admin | seller",
                true,
                "string"
              ),
              generateParam("id", "query", "id danh mục", true, "string"),
              generateParam("name", "query", "tên danh mục", false, "string"),
              generateParam(
                "parentId",
                "query",
                "id danh mục cha",
                false,
                "string"
              ),
              generateParam(
                "sellerId",
                "query",
                "id người bán",
                false,
                "string"
              ),
              generateParam("image", "query", "ảnh danh mục", false, "string"),
            ],
          },
          delete: {
            tags: ["Category"],
            summary: "Xóa danh mục (cả người bán và admin)",
            security,
            parameters: [
              generateParam(
                "permission",
                "query",
                "admin | seller",
                true,
                "string"
              ),
              generateParam("id", "query", "id danh mục", true, "integer"),
            ],
            responses: responses("#/components/schemas/Category"),
          },
        },
        "/api/product/category": {
          get: {
            tags: ["Product"],
            summary: "Lấy sản phẩm theo danh mục của người bán",
            parameters: [
              generateParam(
                "categoryId",
                "query",
                "id của danh mục người bán",
                true,
                "integer"
              ),
            ],
            // responses:
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
