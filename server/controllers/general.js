import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "./../models/OverallStat.js";

//For getting all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For getting user by id
export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//For getting Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    //hardcoded values
    const currentmonth = "February";
    const currentyear = 2021;
    const currentDay = "2021-02-15";

    //Recent Transactions
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    //Overall Stats
    const overallStat = await OverallStat.find({ year: currentyear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentmonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      transactions,
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
