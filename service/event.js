import { errors } from "../config/error";
import { logger } from "../config/winston";
import { createEvent, findById } from "../repository/event";

const eventService = {};

/**
 * Create event
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
eventService.createEvent = async (req, res) => {
  try {
    let event = await createEvent(req.body);
    return res.json(event);
  } catch (error) {
    logger.error(`Error_create_event: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get event detail
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
eventService.getEventDetail = async (req, res) => {
  try {
    let event = await findById({
      id: req.params.eventId
    });
    return res.json(event);
  } catch (error) {
    logger.error(`Error_get_event_detail: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};


export default eventService;
