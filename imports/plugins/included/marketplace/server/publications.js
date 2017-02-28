import { Meteor } from "meteor/meteor";
import { Security } from "meteor/ongoworks:security";
import { Reaction } from "/lib/api";
import { Shops, SellerShops } from "/lib/collections";

Meteor.publish("SellerShops", function () {
  const _id = Reaction.getSellerShopId(this.userId);

  let selector;
  if (!Roles.userIsInRole(this.userId, "owner", Reaction.getShopId())) {
    selector = { _id };
  }

  // Publish a subset of Shops collection to a client-only SellerShops collection
  // This way we keep the Shops collection intact on the client with just one "parent" shop
  Mongo.Collection._publishCursor(Shops.find(selector), this, "SellerShops");

  this.ready();
});
