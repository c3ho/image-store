const storage = require('../src/backend/Utils/storage')

const imageMember = {
    title: "third",
    price: 1.5,
    rating: 0,
    tags: ["blah", "ha", "dah"],
    description: "Blah"
}
//storage.addImage(imageMember);
//storage.findAll();
storage.findImageByTitle("last").then(data => {
    data[0].price = 2.5;
    storage.updateImage(data[0]).then(results => {
        console.log(results);
    })
});
const tags = ["blah", 'ha'];
/*storage.findImageByTags(tags).then(data => {
    console.log(data);
})*/
//storage