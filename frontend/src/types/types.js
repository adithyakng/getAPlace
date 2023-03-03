import dateFormat from "dateformat";

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
  id = null,
  _id = null,
  features = { list: [], feature: "" },
  startDate = new Date(),
  cost = 0,
  bedroom = 0,
  bathroom = 0,
  carpetArea = 0,
  images = [],
  imagesmetadata = [],
  amenities = { list: [], amenity: "" },
  location = {},
  address = "",
  leaseAgreement = [],
  leaseAgreementmetadata = [],
  faqs = "",
}) {
  images = [
    {
      Location:
        "https://fujifilm-x.com/wp-content/uploads/2021/01/gfx100s_sample_04_thum-1.jpg",
      Key: "apple.jpg",
    },
    {
      Location:
        "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      Key: "pineapple.jpg",
    },

    {
      Location:
        "https://dl.fujifilm-x.com/global/products/cameras/x-t3/sample-images/ff_x_t3_002.JPG",
      Key: "greenapple.jpg",
    },
  ];
  this.id = id;
  this._id = _id;
  this.startDate = dateFormat(startDate, "yyyy-mm-dd");
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
  this.location = location;
  this.address = address;

  this.images = [];
  this.imagesmetadata = [];
  for (let i = 0; i < images.length; i++) {
    if (typeof images[i] === "object" && images[i] !== null) {
      this.images.push(images[i].Location);
      this.imagesmetadata.push(images[i].Key);
    } else {
      this.images.push(images[i]);
      this.imagesmetadata.push(imagesmetadata[i]);
    }
  }

  if (!Array.isArray(leaseAgreement)) {
    this.leaseAgreement = [leaseAgreement.Location];
    this.leaseAgreementmetadata = [leaseAgreement.Key];
  } else {
    this.leaseAgreement = leaseAgreement;
    this.leaseAgreementmetadata = leaseAgreementmetadata;
  }

  this.faqs = faqs;
};

const types = {
  SignupObject,
  LoginObject,
  ErrorModalObject,
  NewHouseAdObject,
};

export default types;
