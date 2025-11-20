import ServerErrorStructure from "./types";

class ServerError extends Error implements ServerErrorStructure {
  statusCode: number;

  constructor(message: string, statuscode: number) {
    super(message);
    this.statusCode = statuscode;
  }
}

export default ServerError;
