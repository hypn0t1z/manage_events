import { eventModel } from "../model/event";

const eventRepository = {};

/**
 * Create event repository
 * @param data
 * @returns {Promise<EnforceDocument<unknown, {}>>}
 */
eventRepository.createEvent = async data => {
  const { name, startDate, dueDate, description } = data;
  return eventModel.create({
    name,
    startDate,
    dueDate,
    description
  });
};

/**
 * Find by id repository
 * @param id
 * @param projection
 * @param options
 * @returns {Promise<Query<Document<any, any, unknown> | null, Document<any, any, unknown>, {}, unknown>>}
 */
eventRepository.findById = async ({ id, projection, options }) => {
  return eventModel.findById(id, projection, options);
};

/**
 * Update a document
 * @param id
 * @param data
 * @param options
 * @returns {Promise<Query<UpdateWriteOpResult, Document<any, any, unknown>, {}, unknown>>}
 */
eventRepository.updateOne = async ({ id, data, options }) => {
  const { name, startDate, dueDate, description } = data;
  const dataUpdate = {};

  name && (dataUpdate.name = name);
  startDate && (dataUpdate.startDate = startDate);
  dueDate && (dataUpdate.dueDate = dueDate);
  description && (dataUpdate.description = description);

  await eventModel.updateOne({ _id: id }, dataUpdate, options);

  return dataUpdate;
};

/**
 * Delete event
 * @param id
 * @param options
 * @returns {Promise<{}>}
 */
eventRepository.deleteOne = async ({ id, options }) => {
  return eventModel.deleteOne({ _id: id }, options);
};

export default eventRepository;
