const List = require("../models/List");

exports.getPrivateData = async (req, res, next) => {
  const user = req.user;
  res.status(200).send(user);
};

exports.addelement = async (req, res, next) => {
  try {
    const element = req.body;

    console.log(element.username, element.phone, element.phone);

    const list = new List({
      username: element.username,
      phone: element.phone,
      email: element.email,
      user: req.user.id,
    });

    const saveList = await list.save();

    res.json(saveList);
  } catch (error) {
    res.status(500).send("can't save the element");
  }
};

exports.getList = async (req, res, next) => {
  try {
    const list = await List.find({ user: req.user.id });
    return res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "can't find the notes for this user" });
  }
};

exports.deleteelement = async (req, res, next) => {
  List.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.status(200).json({ success: true, message: "Deleted the item" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Can't delete the item" });
    }
  });
};

exports.editelement = async (req, res, next) => {
  List.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      phone: req.body.phone,
      email: req.body.email,
      updatedAt: new Date(),
    },
    (err, docs) => {
      if (!err) {
        res.status(200).json({ success: true, message: "Edited the item" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Can't edit the item" });
      }
    }
  );
};
