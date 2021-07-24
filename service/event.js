import { errors } from "../config/error";
import { logger } from "../config/winston";
import eventRepository from "../repository/event";
import httpStatus from "../utils/httpStatus";

const eventService = {};

/**
 * Create event
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
eventService.createEvent = async (req, res) => {
  try {
    let event = await eventRepository.createEvent(req.body);
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
    let event = await eventRepository.findById({
      id: req.params.eventId
    });
    return res.json(event);
  } catch (error) {
    logger.error(`Error_get_event_detail: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Update event
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
eventService.updateEvent = async (req, res) => {
  try {
    const id = req.params.eventId;
    let event = await eventRepository.findById({ id });

    if (!event) {
      return res.status(httpStatus.NOT_FOUND).json(errors.EVENT_NOT_FOUND);
    }

    const dataUpdate = await eventRepository.updateOne({ id, data: req.body });

    return res.json({ ...event.toJSON(), ...dataUpdate });
  } catch (error) {
    logger.error(`Error_update_event: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Delete event
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
eventService.deleteEvent = async (req, res) => {
  try {
    const id = req.params.eventId;
    let event = await eventRepository.findById({ id });

    if (!event) {
      return res.status(httpStatus.NOT_FOUND).json(errors.EVENT_NOT_FOUND);
    }

    await eventRepository.deleteOne({ id });

    return res.json(true);
  } catch (error) {
    logger.error(`Error_delete_event: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};

export default eventService;
