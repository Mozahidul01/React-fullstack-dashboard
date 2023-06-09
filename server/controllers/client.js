import mongoose from "mongoose";
import getCountryISO3 from "country-iso-2-to-3";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

//For getting all Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For getting all ProductsWithStats
export const getProductswithStats = async (req, res) => {
  try {
    const productsWithStats = await Product.aggregate([
      {
        $addFields: {
          idString: { $toString: "$_id" },
        },
      },
      {
        $lookup: {
          from: "productstats",
          localField: "idString",
          foreignField: "productId",
          as: "stat",
        },
      },
    ]);

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For getting Product by id
export const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For getting all Customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For getting Customer by id
export const getCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await User.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "product not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For getting all Transactions
export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//For getting all Geo locations of Users
export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocation = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryISO3(country);

      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocation = Object.entries(mappedLocation).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
