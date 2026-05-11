export default interface ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  errors?: any[];
  stack?: any[];
}
