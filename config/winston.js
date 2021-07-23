import winston from "winston";

const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
  transports: [consoleTransport]
}
export const logger = new winston.createLogger(myWinstonOptions)
