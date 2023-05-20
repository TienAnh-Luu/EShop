"use strict";

const helper = {};

helper.createStarList = (stars) => {
  const star = Math.floor(stars);
  const half = stars - star;
  let str = '<div class="ratting">';
  let i;
  for (i = 0; i < star; i++) {
    str += '<i class="fa fa-star"></i>';
  }
  if (half > 0) {
    str += '<i class="fa fa-star-half"></i>';
  }
  for (; i < 5; i++) {
    str += '<i class="fa fa-star-0"></i>';
  }
  str += "</div>";

  return str;
};

module.exports = helper;
