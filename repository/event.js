import { eventModel } from "../model/event";

/**
 * Create event repository
 * @param data
 * @returns {Promise<EnforceDocument<unknown, {}>>}
 */
export const createEvent = async (data) => {
  const { name, startDate, dueDate, description } = data;
  return eventModel.create({
    name,
    startDate,
    dueDate,
    description
  })
}

/**
 * Find by id repository
 * @param id
 * @param projection
 * @param options
 * @returns {Promise<Query<Document<any, any, unknown> | null, Document<any, any, unknown>, {}, unknown>>}
 */
export const findById = async ({ id, projection, options }) => {
  return eventModel.findById(id, projection, options)
}
