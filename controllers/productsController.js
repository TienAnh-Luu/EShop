let controller = {};
const models = require("../models");

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

module.exports = controller;
