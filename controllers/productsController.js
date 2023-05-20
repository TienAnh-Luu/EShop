let controller = {};
const models = require("../models");

controller.getData = async (req, res, next) => {
  const categories = await models.Category.findAll({
    include: [
      {
        model: models.Product,
      },
    ],
  });
  res.locals.categories = categories;

  const brands = await models.Brand.findAll({
    include: [
      {
        model: models.Product,
      },
    ],
  });
  res.locals.brands = brands;

  const tags = await models.Tag.findAll();
  res.locals.tags = tags;

  next();
};

controller.show = async (req, res) => {
  const category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
  const brand = isNaN(req.query.brand) ? 0 : parseInt(req.query.brand);
  const tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);

  const categories = await models.Category.findAll({
    include: [
      {
        model: models.Product,
      },
    ],
  });
  res.locals.categories = categories;

  const brands = await models.Brand.findAll({
    include: [
      {
        model: models.Product,
      },
    ],
  });
  res.locals.brands = brands;

  const tags = await models.Tag.findAll();
  res.locals.tags = tags;

  const options = {
    attributes: ["id", "name", "imagePath", "stars", "price", "oldPrice"],
    where: {},
  };
  if (category > 0) {
    options.where.categoryId = category;
  }
  if (brand > 0) {
    options.where.brandId = brand;
  }
  if (tag > 0) {
    options.include = [
      {
        model: models.Tag,
        where: { id: tag },
      },
    ];
  }

  const products = await models.Product.findAll(options);
  res.locals.products = products;
  res.render("product-list");
};

controller.showDetails = async (req, res) => {
  const id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  const product = await models.Product.findOne({
    attributes: [
      "id",
      "name",
      "stars",
      "oldPrice",
      "price",
      "summary",
      "description",
      "specification",
    ],
    where: { id },
    include: [
      {
        model: models.Image,
        attributes: ["name", "imagePath"],
      },
      {
        model: models.Review,
        attributes: ["id", "review", "stars", "createdAt"],
        include: [
          {
            model: models.User,
            attributes: ["firstName", "lastName"],
          },
        ],
      },
    ],
  });

  res.locals.product = product;
  res.render("product-detail");
};

module.exports = controller;
