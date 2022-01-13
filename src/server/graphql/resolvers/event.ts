import db from "../../models/sql";
import { DataTypes } from "sequelize";
import * as Joi from "joi";
import { validateRequest } from "../../middleware/validate-request";

const Events = require("../../models/sql/events")(db.sequelize, DataTypes);

const EventsQueries = {
  events: async (parent: any, { offset, limit, search }, context: any) => {
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    let whereClause = {};
    if (search && search.length > 2) {
      whereClause = {
        name: {
          [Op.like]: `%${search ? search : "%"}%`,
        },
      };
    }
    try {
      const events = await Events.findAndCountAll({
        where: whereClause,
        limit: limit,
        offset: offset * limit,
        order: [["date", "DESC"]],
      });
      if (events.count === 0) {
        return { totalRows: 0, eventsData: null };
      }
      return { totalRows: events.count, eventsData: events.rows };
    } catch (err) {
      return err;
    }
  },
};

const EventsMutations = {
  addEvent: async (parent, { event }, context) => {
    const schema = Joi.object({
      name: Joi.string().trim().required().messages({
        "string.empty": `Name is a required field`,
      }),
      description: Joi.string().trim().required().messages({
        "string.empty": `description is a required field`,
      }),
      date: Joi.date().raw().required().messages({
        "string.empty": `Date is a required field`,
      }),
      organizer: Joi.string().trim().required().messages({
        "string.empty": `organizer is a required field`,
      }),
    });
    let result = {
      status: null,
      msg: null,
      events: null,
    };
    const response = await validateRequest(event, schema);
    if (response.status === false) {
      result.status = false;
      result.msg = response.message;
      return result;
    }
    try {
      const eventdata = await Events.create(event);
      result.status = true;
      result.msg = "Event added";
      result.events = eventdata;
      return result;
    } catch (err) {
      return err;
    }
  },

  deleteEvent: async (parent, { eventID }, context) => {
    try {
      const event = await Events.findOne({ where: { id: eventID } });
      if (!event) {
        throw new Error("Events with the given id does not exist");
      }
      const response = await Events.destroy({ where: { id: eventID } });
      if (response) {
        return { status: true, msg: "Deleted" };
      }
    } catch (err) {
      return err;
    }
  },

  updateEvent: async (parent, { eventID, event }, context) => {
    const schema = Joi.object({
      name: Joi.string().trim().required().messages({
        "string.empty": `Name is a required field`,
      }),
      description: Joi.string().trim().required().messages({
        "string.empty": `description is a required field`,
      }),
      date: Joi.date().raw().required().messages({
        "string.empty": `Date is a required field`,
      }),
      organizer: Joi.string().trim().required().messages({
        "string.empty": `organizer is a required field`,
      }),
    });
    let result = {
      status: null,
      msg: null,
      events: null,
    };
    const response = await validateRequest(event, schema);
    if (response.status === false) {
      result.status = false;
      result.msg = response.message;
      return result;
    } else {
      try {
        const response = await Events.update(event, { where: { id: eventID } });
        if (response != 1) {
          throw new Error("Event with given id does not exist");
        }
        const events = await Events.findOne({ where: { id: eventID } });
        result.status = true;
        result.msg = "event updated";
        result.events = events;
        return result;
      } catch (err) {
        return err;
      }
    }
  },
};

export { EventsQueries, EventsMutations };
