const SignupObject = function (
  name = "",
  email = "",
  password = "",
  countryCode = "",
  phoneNumber = "",
  combinedNumber = "+1"
) {
  this.name = name;
  this.email = email;
  this.password = password;
  this.countryCode = countryCode;
  this.phoneNumber = phoneNumber;
  this.combinedNumber = combinedNumber;
};

const LoginObject = function (email = "", password = "") {
  this.email = email;
  this.password = password;
};

const ErrorModalObject = function (
  title = "Error!",
  body = "An error occured. Please try again!",
  show = false
) {
  this.title = title;
  this.body = body;
  this.show = show;
};

const NewHouseAdObject = function ({
  _id = null,
  features = { list: ["security 24/7"], feature: "" },
  cost = 1200,
  bedroom = 2,
  bathroom = 2,
  carpetArea = 1890,
  images = [],
  amenities = { list: ["swimming pool", "basketball court"], amenity: "" },
  location = {},
  address = "3800 SW 34th street",
  leaseAgreement = [],
  imagesmetadata = [],
  leaseAgreementmetadata = [],
}) {
  this._id = _id;
  this.features = features;
  if (Array.isArray(this.features)) {
    this.features = { list: this.features, feature: "" };
  }

  this.amenities = amenities;
  if (Array.isArray(this.amenities)) {
    this.amenities = { list: this.amenities, amenity: "" };
  }

  this.cost = cost;
  this.bedroom = bedroom;
  this.bathroom = bathroom;
  this.carpetArea = carpetArea;
  this.images = images;
  this.location = location;
  this.address = address;
  this.leaseAgreement = leaseAgreement;
  this.imagesmetadata = imagesmetadata;
  this.leaseAgreementmetadata = leaseAgreementmetadata;
};

const types = {
  SignupObject,
  LoginObject,
  ErrorModalObject,
  NewHouseAdObject,
};

export default types;
