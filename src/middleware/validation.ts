import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to validate MyUser request body.
 * Validates the fields: name, addressLine1, country, and city.
 */

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .notEmpty()
    .withMessage("Address Line 1 must be a string"),
  body("country").notEmpty().withMessage("Country must be a string"),
  body("city").notEmpty().withMessage("City must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .notEmpty()
    .withMessage("Restaurant Name must be a string"),
  body("city").notEmpty().withMessage("City must be a string"),
  body("country").notEmpty().withMessage("Country must be a string"),
  body("deliveryPrice")
    .isFloat()
    .withMessage("Delivery Price must be a number"),
  body("estimatedDeliveryTime")
    .isFloat({ min: 0 })
    .withMessage("Estimated Delivery Time must be a number"),
  // body("image").notEmpty().withMessage("Image must be a string"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array of strings"),
  // .custom((value) => {
  //   if (!value.every((item: any) => typeof item === "string")) {
  //     throw new Error("Cuisines must be an array of strings");
  //   }
  //   return true;
  // }),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu Item Name must be a string"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu Item Price must be a number"),
  //   }
  //   return true;
  // }),
  handleValidationErrors,
];

export const parseFormDataFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Parse cuisines from JSON string to array
  if (req.body.cuisine) {
    // If only one cuisine, it will be a string, otherwise an array
    req.body.cuisines = Array.isArray(req.body.cuisine)
      ? req.body.cuisine
      : [req.body.cuisine];
    delete req.body.cuisine;
  }
  // Parse menuItems from JSON string to array
  if (req.body.menuItems) {
    try {
      req.body.menuItems = JSON.parse(req.body.menuItems);
    } catch {
      req.body.menuItems = [];
    }
  }
  next();
};
