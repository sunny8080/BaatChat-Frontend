export default interface SocketError extends Error {
  data?: {
    code?: string;
    type?: string;
    message?: string;
    [key: string]: any;
  };
}
