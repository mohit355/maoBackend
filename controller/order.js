const { Op } = require("sequelize");
const db = require("../db/models/index");
const orderid = require("order-id")("key");
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await db.Order.findAll({
      include: [
        {
          model: db.Address,
        },
        {
          model: db.User,
        },
      ],
      where: {
        id: id,
      },
    });
    res.status(200).json({ data: order });
  } catch (error) {
    console.log("error in grtting order by ID ", error);
    res.status(400).send({ error });
  }
};
exports.getAllOrders = async (req, res) => {
  const { status = "", outletName = "",orderId="" } = req.query;
  try {
    const orders = await db.Order.findAll({
      where: {
        status: { [Op.iLike]: `%${status}%` },
        outletName: { [Op.iLike]: `%${outletName}%` },
        orderId: { [Op.iLike]: `%${orderId}%` },
      },
      include: [
        {
          model: db.Address,
        },
        {
          model: db.User,
        },
      ],
    });
    res.status(200).json({ data: orders });
  } catch (error) {
    console.log("error in grtting order by ID ", error);
    res.status(400).send({ error });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const orderId = orderid.generate();
    const newOrder = await db.Order.create({
      ...req.body,
      userId: req.user.id,
      orderId: orderId,
    });
    await newOrder.save();
    res.status(200).json({
      msg: "Order received. You will get a confirmation notification soon",
      data: newOrder,
    });
  } catch (error) {
    console.log("error in new order ", error);
    res.status(400).send({ error });
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await db.Order.update(
      {
        ...req.body,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).send({ msg: "Order status updated" });
  } catch (error) {
    console.log("Product update error ", error);
    res.status(400).send({ error });
  }
};
