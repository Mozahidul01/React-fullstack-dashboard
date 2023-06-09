import OverallStat from "../models/OverallStat.js";

//For getting all OverallStats
export const getSaleStat = async (req, res) => {
  try {
    const saleStat = await OverallStat.find();
    res.status(200).json(saleStat[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
