const { ProductOffer, Product } = require('../models');

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await ProductOffer.findAll({
      include: [
        {
          model: Product,
          as: 'product',
          include: ['images'], // Incluye imágenes del producto
        },
      ],
    });
    res.json(offers);
  } catch (error) {
    console.error('Error al recuperar las ofertas:', error);
    res.status(500).json({ error: 'Error retrieving offers' });
  }
};

exports.getOfferById = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await ProductOffer.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'product',
          include: ['images'],
        },
      ],
    });

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    res.json(offer);
  } catch (error) {
    console.error('Error al recuperar la oferta:', error);
    res.status(500).json({ error: 'Error retrieving offer' });
  }
};

exports.createOffer = async (req, res) => {
  const { idproduct, offer_price, start_date, end_date, description } = req.body;
  try {
    const newOffer = await ProductOffer.create({
      idproduct,
      offer_price,
      start_date,
      end_date,
      description,
    });
    res.status(201).json(newOffer);
  } catch (error) {
    console.error('Error al crear la oferta:', error);
    res.status(500).json({ error: 'Error creating offer' });
  }
};

exports.updateOffer = async (req, res) => {
  const { id } = req.params;
  const { offer_price, start_date, end_date, description } = req.body;
  try {
    const offer = await ProductOffer.findByPk(id);

    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }

    offer.offer_price = offer_price;
    offer.start_date = start_date;
    offer.end_date = end_date;
    offer.description = description;

    await offer.save();
    res.json(offer);
  } catch (error) {
    console.error('Error al actualizar la oferta:', error);
    res.status(500).json({ error: 'Error updating offer' });
  }
};

exports.deleteOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ProductOffer.destroy({ where: { idoffer: id } });
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Offer not found' });
    }
  } catch (error) {
    console.error('Error al eliminar la oferta:', error);
    res.status(500).json({ error: 'Error deleting offer' });
  }
};
