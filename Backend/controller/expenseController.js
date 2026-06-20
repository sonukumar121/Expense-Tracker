import expense from "../model/expense.js";
import jwt from "jsonwebtoken";

export const addexpense = async (req, res) => {
  try {
    const { date, category, note, amount, type } = req.body;
    const expenses = await expense.create({
      date,
      category,
      note,
      amount,
      userid: req.user.id,
      type,
    });
    res.json({ message: "expenses created successfully", expense: expenses });
  } catch (err) {
    console.log(err);
  }
};

export const searchexpense = async (req, res) => {
  try {
    const { search,dat } = req.query;

    if (!search) {
      return res.status(400).json({
        message: "Search data is required",
      });
    }

    if(dat)
    {
      const start = new Date(dat);
    const end = new Date(dat);

    end.setDate(end.getDate() + 1);

    const expenses = await expense.find({
      userid: req.user.id,
      date: {
        $gte: start,
        $lt: end,
      },
    });

    return res.json({ expenses });
    }

    


    const expenses = await expense.find({
      userid: req.user.id,
      $or: [
        {
          note: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    });

    res.json({ expenses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getexpense = async (req, res) => {
  try {
    let incomet = 0,
      expenset = 0;
    const expenses = await expense.find({ userid: req.user.id });

    const inc = await expense.find({ userid: req.user.id, type: "income" });
    for (let i = 0; i < inc.length; i++) {
      incomet = incomet + inc[i].amount;
    }

    const exp = await expense.find({ userid: req.user.id, type: "expense" });
    for (let i = 0; i < exp.length; i++) {
      expenset = expenset + exp[i].amount;
    }
    res.json({ expenses, incomet, expenset });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteexpense = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await expense.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "expense not found" });
    res.json({ message: "expense deleted successfully", expense: deleted });
  } catch (err) {
    console.log(err);
  }
};

export const updateexpense = async (req, res) => {
  try {
    const id = req.params.id;
    const update = await expense.findByIdAndUpdate(id);
    if (!update) return res.status(404).json({ message: "not updated" });
    res.json({ message: "expense updated successfully", expense: update });
  } catch (err) {
    console.log(err);
  }
};
