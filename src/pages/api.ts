export type Data<T = null> = {
  success: boolean;
  data?: T | null;
  message?: string;
};
export enum Methods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}
