
const Service = require("../models/Service");

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const service = await Service.create({
      title,
      description,
      category,
      price,
      provider:req.user.id,
    });

    res.status(201).json({
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      services,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Check if the logged-in user owns the service
   // Check if provider exists
if (!service.provider) {
  return res.status(400).json({
    message: "Service has no provider assigned",
  });
}

// Check if the logged-in user owns the service
// Check if provider exists
if (!service.provider) {
  return res.status(400).json({
    message: "Service has no provider assigned",
  });
}

// Check if the logged-in user owns the service
if (service.provider.toString() !== req.user.id) {
  return res.status(401).json({
    message: "Not authorized",
  });
}

    service.title = req.body.title || service.title;
    service.description = req.body.description || service.description;
    service.category = req.body.category || service.category;
    service.price = req.body.price || service.price;

    const updatedService = await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    // Check if logged-in user owns the service
   // Check if provider exists
if (!service.provider) {
  return res.status(400).json({
    message: "Service has no provider assigned",
  });
}

// Check if logged-in user owns the service
if (service.provider.toString() !== req.user.id) {
  return res.status(401).json({
    message: "Not authorized",
  });
}
    await service.deleteOne();

    res.status(200).json({
      message: "Service deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};