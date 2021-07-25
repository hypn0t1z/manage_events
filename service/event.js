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
    const event = await eventRepository.createEvent(req.body);
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
    const event = await eventRepository.findById({
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
    const event = await eventRepository.findById({ id });

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
    const _id = req.params.eventId;
    const event = await eventRepository.findById({ id: _id });

    if (!event) {
      return res.status(httpStatus.NOT_FOUND).json(errors.EVENT_NOT_FOUND);
    }

    await eventRepository.deleteOne({ conditions: { _id } });

    return res.json(true);
  } catch (error) {
    logger.error(`Error_delete_event: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get list of ended events
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
eventService.getEndedEvents = async (req, res) => {
  try {
    const conditions = {
      dueDate: { $lte: new Date() }
    };
    const events = await eventRepository.paginate({ conditions });
    return res.json(events);
  } catch (error) {
    logger.error(`Error_get_list_ended_events: ${error}`);
    return res.status(500).json(errors.INTERNAL_SERVER_ERROR);
  }
};

export default eventService;
