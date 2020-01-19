const mongoose = require('mongoose');
const Image = require('../Models/Images');

module.exports = {

    // Returns an image by exact title
    findImageByTitle: async (title) => {
        const query = Image.find({ title: title })
        return query;
    },

    // Adds an image, will check for duplicate names
    addImage: async (image) => {
        const dupTitle = await module.exports.findImageByTitle(image.title);
        if (dupTitle.length < 0){
            const newImage = new Image({
                title: image.title,
                price: image.price,
                description: image.description,
                tags: image.tags,
            });
            newImage.save((err) => {
                if (err) {
                    console.log("An issue occured while trying to add image");
                } else {
                    console.log(`Successfully added image: ${image.title}`);
                }
            })
        }
        console.log(`${image.title} has already been used! Please use a different title.`)
    },
    
    // Returns images that have ONLY tags selected
    filterImageByTags: async (tags) => {
        const query = Image.find({ tags: {'$all': tags }})
        return query;
    },

    // Returns all images containing any of the tags selected
    findImageByTags: async (tags) => {
        const query = Image.find({ tags: {'$in': tags }})
        return query;
    },

    // Returns all images
    findAll: async () => {
        const query = Image.find();
        return query;
    },

    // Updates image based on title property of record
    updateImage: async (image) => {
        const filter = { title: image.title };
        const update = {
            title: image.title,
            price: image.price,
            rating: image.rating,
            tags: image.tags,
            description: image.description,
            inventory: image.inventory,
            private: image.private,
            album: image.album
        };
        try {
            const result = await Image.findOneAndUpdate(filter, update, {new: true});
            console.log(`Success updating information for image: ${result.title}`);
            return result;
        } catch (error) {
            console.log("There was an error updating the image");
            throw new Error(error);
        }
    },

    // Update price
    updateImagePrice: async (image, price) => {
        const filter = { title: image.title };
        const update = {
            price: price
        };
        try {
            const result = await Image.findOneAndUpdate(filter, update, {new:  true});
            console.log(`Success updating the price for image: ${result.title} to ${result.price}`)
        } catch (error) {
            console.log("There was an error updating the price of the image");
            throw new Error(error);
        }
    },

    // Update inventory
    updateImageInventory: async (image, inventory) => {
        const filter = { title: image.title };
        const update = {
            inventory: inventory
        };
        try {
            const result = await Image.findOneAndUpdate(filter, update, {new:  true});
            console.log(`Success updating the price for image: ${result.title} to ${result.inventory}`)
        } catch (error) {
            console.log("There was an error updating the inventory of the image");
            throw new Error(error);
        }
    },

    // Update tags
    updateImageTags: async (image, tags) => {
        const filter = { title: image.title };
        const update = {
            tags: tags
        };
        try {
            const result = await Image.findOneAndUpdate(filter, update, {new:  true});
            console.log(`Success updating the price for image: ${result.title} to ${result.tags}`)
        } catch (error) {
            console.log("There was an error updating the tags of the image");
            throw new Error(error);
        }
    },

    // Remove image
    removeImage: async (image) => {
        const filter = { title: image.title };
        try {
            const result = await Image.findOneAndRemove(filter);
            console.log(`Removed image: ${result.title}`);
            return result;
        } catch (error) {
            console.log("There was an error removing the image");
            throw new Error(error);
        }
    }
}