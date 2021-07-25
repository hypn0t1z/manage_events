import { PAGINATION, PAGINATION_MAX } from "../constants/common";

class BaseRepository {
  constructor(schemaModel) {
    this.model = schemaModel;
  }

  /**
   * find one by id
   * @param id
   * @param projection
   * @param options
   * @param populate
   * @returns {Promise<*>}
   */
  async findById({ id, projection, options, populate }) {
    return this.model
      .findById(id, projection, options)
      .populate(populate || "");
  }

  /**
   * pagination
   * @param conditions
   * @param projection
   * @param options
   * @param populate
   * @param sort
   * @param limit
   * @param page
   * @returns {Promise<{total: unknown, pages: number, data: *, limit: (number), page: number}>}
   */
  async paginate({
    conditions,
    projection,
    options,
    populate,
    sort,
    limit,
    page
  }) {
    const limitPaginate =
        limit && Number(limit) >= 0
            ? limit > PAGINATION_MAX
            ? PAGINATION_MAX
            : Number(limit)
            : PAGINATION;

    const pagePaginate = page && +page > 0 ? +page : 1;
    const promises = await Promise.all([
      this.model.countDocuments(conditions),
      this.model
          .find(conditions, projection, options)
          .populate(populate || "")
          .sort(sort)
          .skip((pagePaginate - 1) * limitPaginate)
          .limit(limitPaginate)
          .lean()
    ]);

    const total = promises[0];
    const pages = Math.ceil(Number(total) / limitPaginate);

    return {
      data: promises[1],
      limit: limitPaginate,
      total,
      page: pagePaginate,
      pages
    };
  }

  /**
   * delete one by conditions
   * @param conditions
   * @param options
   * @returns {Promise<unknown>}
   */
  async deleteOne({ conditions, options }) {
    return this.model.deleteOne(conditions, options);
  }
}

export default BaseRepository;
