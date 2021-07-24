import { eventModel } from "../model/event";
import BaseRepository from "./index";

class EventRepository extends BaseRepository {
  constructor() {
    super(eventModel);
  }

  /**
   * Create event repository
   * @param data
   * @returns {Promise<EnforceDocument<unknown, {}>>}
   */
  async createEvent(data) {
    const { name, startDate, dueDate, description } = data;
    return eventModel.create({
      name,
      startDate,
      dueDate,
      description
    });
  }

  /**
   * Update a document
   * @param id
   * @param data
   * @param options
   * @returns {Promise<Query<UpdateWriteOpResult, Document<any, any, unknown>, {}, unknown>>}
   */
  async updateOne({ id, data, options }) {
    const { name, startDate, dueDate, description } = data;
    const dataUpdate = {};

    name && (dataUpdate.name = name);
    startDate && (dataUpdate.startDate = startDate);
    dueDate && (dataUpdate.dueDate = dueDate);
    description && (dataUpdate.description = description);

    await eventModel.updateOne({ _id: id }, dataUpdate, options);

    return dataUpdate;
  }
}

export default new EventRepository();
