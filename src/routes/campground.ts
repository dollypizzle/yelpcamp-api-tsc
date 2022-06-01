import express, { Response, Router } from 'express';
import Campground from '../models/campground';
import auth, { IntRequest } from '../middleware/auth';

const campgroundRouter: Router = express.Router();

//create campgrounds
campgroundRouter.post(
  '/campgrounds',
  auth,
  async (req: IntRequest, res: Response) => {
    const campground = new Campground({
      ...req.body,
      owner: req.user && req.user._id,
    });

    try {
      await campground.save();
      res.status(201).send(campground);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

//Get all the campgrounds from db
campgroundRouter.get('/campgrounds', (req: IntRequest, res: Response) => {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      res.status(500).send();
    } else {
      res.status(201).send(campgrounds);
    }
  });
});

//get campground by id
campgroundRouter.get('/campground/:id', (req: IntRequest, res: Response) => {
  const _id = req.params.id;

  Campground.findById(_id)
    .then(campground => {
      if (!campground) {
        return res.status(404).send();
      }

      res.send(campground);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

//update campground
campgroundRouter.patch(
  '/campground/:id',
  auth,
  async (req: IntRequest, res: Response) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'price', 'image', 'description'];
    const isValidOperation = updates.every(update =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const campground = await Campground.findByIdAndUpdate(
        { _id: req.params.id, owner: req.user && req.user._id },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!campground) {
        return res.status(404).send();
      }

      res.send(campground);
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

//delete user campground
campgroundRouter.delete(
  '/campgrounds/:id',
  auth,
  async (req: IntRequest, res: Response) => {
    try {
      const campground = await Campground.findOneAndDelete({
        _id: req.params.id,
        owner: req.user && req.user._id,
      });

      if (!campground) {
        res.status(404).send();
      }

      res.send(campground);
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

export { campgroundRouter };
