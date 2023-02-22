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

const NewHouseAdObject = function (
  features = { list: [], feature: "" },
  cost = 0,
  bedroom = 0,
  bathroom = 0,
  carpetArea = 1890,
  images = [],
  amenities = { list: [], amenity: [] },
  location = {},
  address = "",
  leaseAgreement = "",
  imagesmetadata = [],
  leaseAgreementmetadata = []
) {
  this.features = features;
  this.cost = cost;
  this.bedroom = bedroom;
  this.bathroom = bathroom;
  this.carpetArea = carpetArea;
  this.images = images;
  this.amenities = amenities;
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
