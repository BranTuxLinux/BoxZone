export type Data<T = null> = {
  success: boolean;
  data?: T;
  message?: string;
};
export enum Methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}
