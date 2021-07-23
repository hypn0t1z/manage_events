import { eventModel } from "../model/event";
import { errors } from "../config/error";
import { logger } from "../config/winston";

const eventService = {};

/**
 * Create event
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
eventService.createEvent = async (req, res) => {
  try {
    const { name, startDate, dueDate, description } = req.body;
    let event = await eventModel.create({
      name,
      startDate,
      dueDate,
      description
    });
    return res.json(event);
  } catch (error) {
    logger.error(`Error_create_event: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};

export default eventService;
