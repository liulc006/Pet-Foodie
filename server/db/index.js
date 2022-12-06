const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const LineItem = require('./LineItem');
const Rating = require('./Rating');
const fs = require('fs');
const path = require('path');

const getImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'base64', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);

//Rating Table based on Relational Graph
Rating.belongsTo(User);
User.hasMany(Rating);
Rating.belongsTo(Product);
Product.hasMany(Rating);

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const profAvatar = await getImage(
    path.join(__dirname, '../../static/img/avatar_prof.png')
  );

  const [moe, luca, max, nono, lok, prof] = await Promise.all([
    User.create({ username: 'moe', password: '123', email: 'moe@gmail.com' }),
    User.create({ username: 'luca', password: '123', email: 'luca@gmail.com' }),
    User.create({
      username: 'MAX',
      password: '123',
      email: 'lmx4wo@gmail.com',
      firstName: 'Max',
      lastName: 'Li',
      phone: '123-456-7890',
      address: '123 Hancock Street, Boston, MA 02108',
      isAdmin: true,
    }),

    User.create({ username: 'nono', password: '123', email: 'nono@gmail.com' }),
    User.create({ username: 'lok', password: '123', email: 'lok@gmail.com' }),
    User.create({
      username: 'prof',
      password: '123',
      email: 'prof@gmail.com',
      firstName: 'Eric',
      lastName: 'Katz',
      phone: '123-456-7890',
      address: '123 Hancock Street, Boston, MA, 02108',
      avatar: profAvatar,
    }),
  ]);

  const [
    foo,
    bar,
    bazz,
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15,
  ] = await Promise.all([
    Product.create({
      //18 products
      name: 'Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble',
      price: '22.99',
      description:
        "Give your furry friend a taste of the good life with the Pedigree Complete Nutrition Grilled Steak & Vegetable Flavor Dog Kibble Adult Dry Dog Food. With a succulent steak flavor accented with hearty vegetables, this food has everything you need to keep your dog feeling his best. It's prepared with whole grains for healthy digestion, plus essential nutrients and omega-6 fatty acids to promote a healthy skin and luxurious coat. And perhaps best of all, the crunchy texture of the kibble helps clean his teeth, so he's always ready for his close up. It's the easy way to combine great-tasting food plus nutrition that promotes health and vitality into a single bowl.",
      quantity: 100,
      imageName: '1.png',
      foodForm: 'Wet Food',
      animal: 'Dog',
      lifeStage: 'Senior',
    }),
    Product.create({
      name: 'Purina Pro Plan Sensitive Skin & Stomach Salmon & Rice Formula Dry Dog Food',
      price: '39.99',
      description:
        "Tend to your furry friend with Purina Pro Plan Salmon & Rice Formula. This high-protein dry food for adult dogs is formulated to nurture your sidekick's sensitive skin and stomach. It features real, nutrient-rich salmon as the very first ingredient in a highly-digestible recipe with rice and oatmeal. This dry dog food is fortified with live probiotics and prebiotic fiber for your pet pal's digestive and immune health. It also contains omega-6 fatty acids and vitamin A to help nourish your cuddly companion's skin and coat and omega-3 fatty acids to support healthy joints and mobility.",
      quantity: 100,
      imageName: '2.png',
      foodForm: 'Dry Food',
      animal: 'Dog',
      lifeStage: 'Baby',
    }),
    Product.create({
      name: 'Blue Buffalo Life Protection Formula Adult Chicken & Rice Dry Dog Food',
      price: '29.99',
      description:
        'Blue Buffalo Life Protection Formula was created for the holistic health and well-being of adult dogs. All formulas start with real meat, whole grains, garden veggies and fruit, plus added LifeSource Bits, a precise blend of nutrients that have been enhanced with a Super 7 package of antioxidant-rich ingredients. This Adult Chicken & Brown Rice Recipe features delicious, protein-rich deboned chicken and other natural ingredients for a healthy meal your dog will love.',
      quantity: 100,
      imageName: '3.png',
      foodForm: 'Dry Food',
      animal: 'Dog',
      lifeStage: 'Adult',
      isBestSeller: true,
    }),
    Product.create({
      name: 'Bundle: Pedigree Variety Pack With Beef & Chicken Canned Dog Food',
      price: '32.99',
      description:
        "Pedigree crafts healthful formulas based on the belief that dogs bring out the good in us, so it's essential that we bring out the good in them with the high-quality nutrition they deserve. Their product assortment includes wet food, dry food and treats for dogs from all life stages. These recipes help support overall health, so pets can put their best paws forward and lead a happy and healthy life. Make mealtime exciting by mixing your sidekicks kibble with Pedigrees wet dog food! These moisture-rich recipes come in a variety of meaty options including Choice Cuts in Gravy with Beef and Morsels in Sauce with Chicken. Whether you have a puppy or a senior, Pedigree's wet dog food offers complete nourishment with digestible ingredients for dogs from all barks of life.",
      quantity: 100,
      imageName: '4.png',
      foodForm: 'Dry Food',
      animal: 'Dog',
      lifeStage: 'Adult',
      isBestSeller: true,
    }),
    Product.create({
      name: 'Purina ONE SmartBlend Ground Beef & Brown Rice Adult Canned Dog Food',
      price: '15.00',
      description:
        "Please your pooch with the meaty flavor of Purina ONE Natural Classic Ground Beef and Brown Rice Entree Adult Wet Dog Food with added vitamins, minerals and nutrients. Real beef is the first ingredient, along with a helping of brown rice for a wholesome combo. Pups can't resist the tempting taste and texture of this soft dog food. Plus, this recipe contains 0% fillers and no poultry by-products, which means that every high-quality ingredient has a purpose. This premium dog food has vitamins for dogs and is packed with protein, a combo that helps maintain your pal's strong muscles and healthy joints as he jumps and plays. Every serving also provides 100% complete and balanced nutrition for adult dogs, helping support your furry guy's well-being from nose to tail. Give your best buddy a quality meal from a trusted brand with this brown rice and beef dog food recipe.",
      quantity: 100,
      imageName: '5.png',
      foodForm: 'Wet Food',
      animal: 'Dog',
      lifeStage: 'Senior',
    }),
    Product.create({
      name: 'Blue Buffalo Homestyle Recipes Variety Pack Chicken & Beef Canned Dog Food',
      price: '20.50',
      description:
        'Let your canine companion choose his cuisine with a variety pack of Blue Buffalo Homestyle Recipe Natural Adult Wet Dog Food. Paw-fect for your grown-up guy, this irresistibly tasty wet food is made using only the finest natural ingredients. It starts with high-quality protein from tender chunks of chicken or beef, packed with garden fruit and veggies, then enhanced with vitamins and minerals. Formulated to support lean muscle mass and the other nutritional needs of your doggie dude, this pate-style dog food is made with wholesome ingredients that do not contain any by-product meals, corn, wheat, soy, artificial flavors or preservatives.',
      quantity: 100,
      imageName: '6.png',
      foodForm: 'Wet Food',
      animal: 'Dog',
      lifeStage: 'Adult',
    }),
    Product.create({
      name: 'Pedigree Choice Cuts in Gravy Prime Rib & Vegetable Adult Canned Wet Dog Food',
      price: '18.70',
      description:
        'With the Pedigree Homestyle Meals Prime Rib, Rice & Vegetable Flavor in Gravy & Roasted Chicken, Rice & Vegetable Flavor in Gravy Canned Soft Wet Dog Food Variety Pack, you will be giving your furbaby su-paw tasty, balanced nutrition with every meal. This delicious food features real beef plus hearty veggies to help keep your best friend looking and feeling his best. With this variety pack of meaty flavors, you can mix up mealtime and keep it exciting for tail-wagging good taste.',
      quantity: 100,
      imageName: '7.png',
      foodForm: 'Wet Food',
      animal: 'Dog',
      lifeStage: 'Adult',
    }),
    Product.create({
      name: 'True Acre Foods Hearty Stews, Beef & Vegetable Recipe, Wet Dog Food',
      price: '18.99',
      description:
        "True Acre Foods Hearty Stews are comforting recipes, crafted with wholesome nutrition and delicious, homemade taste. With tender cuts featuring real beef, nutritious peas and carrots simmered in a savory gravy, these homestyle recipes not only satisfy your pup's appetite, they also provide the essential nutrients your best friend needs to stay happy and healthy. If you're looking for a meal that'll have them waiting for dinner time and that you can feel good about serving, just take a close look at these savory stews. Once you see the real, recognizable proteins and bountiful veggies inside, you'll know why dogs love these recipes. And with no artificial preservatives, colors or flavors, you can trust these homestyle meals have the nutrition your best friend needs and nothing they dont.",
      quantity: 100,
      imageName: '8.png',
      foodForm: 'Wet Food',
      animal: 'Dog',
      lifeStage: 'Senior',
      isBestSeller: true,
    }),
    Product.create({
      name: 'Purina Beneful Chopped Blends With Beef, Carrots, Peas & Barley Wet Dog Food',
      price: '14.15',
      description:
        "Beef up your pooch's meals with Purina Beneful Chopped Blends With Beef, Carrots, Peas & Barley Wet Dog Food. Tender, meaty shreds made with real beef give dogs the taste and texture they adore. Plus, each dog food tub has real carrots, peas and barley you can see, along with a savory juice for a flavorful finish. Pups love the meaty flavor, while you love the wholesome goodness of a high quality dog food with 23 essential vitamins and minerals. Even better, this high protein dog food supports your furry friend's strong muscles as he races and plays through his day. Serve Beneful Chopped Blends dog food as a delicious meal, or mix it with kibble as tasty wet dog food toppings. Either way, this Beneful wet dog food tub is reclosable to easily store leftovers.",
      quantity: 100,
      imageName: '9.png',
      foodForm: 'Wet Food',
      animal: 'Dog',
      lifeStage: 'Baby',
    }),
    Product.create({
      name: 'Cesar Classic Loaf in Filet Mignon & Grilled Chicken Variety Pack Dog Food',
      price: '15.15',
      description:
        'Give your foodie pups a hi-brow treat with Canine Cuisine Wet Dog Food Variety Pack, which features US Beef or US Chicken as the #1 ingredient. Perfect for large or small dogs, the gourmet taste and smell will delight even the pickiest of pals. Canine Cuisine Classic Loaf in sauce Variety Pack Dog Food treats your pup to a delicious classic loaf in sauce texture. These formulas are enhanced with vitamins and minerals, which means every single-serve tray is part of a balanced and complete diet. They are perfect to serve your pal as a meal on their own or as a delicious dry food topper. Plus, the convenient trays have easy peel-away freshness seals to make mealtime a snap.',
      quantity: 100,
      imageName: '10.png',
      foodForm: 'Wet Food',
      animal: 'Dog',
      lifeStage: 'Adult',
    }),
    Product.create({
      name: 'Friskies Savory Shreds Variety Pack Beef, Turkey & Chicken Canned Cat Food',
      price: '25.50',
      description:
        'Your kitty loves savory, so satisfy his cravings with the Friskies Savory Shreds Variety Pack Canned Cat Food. This variety pack features whisker-licking recipes with real meat like beef, turkey, tuna, chicken and salmon, and is packed with everything your cat needs to fuel all those furry adventures - like protein, antioxidants and healthy omegas. The formula is also enhanced with vitamins, minerals and essential taurine for nose-to-tail well-being in every bite. Plus, it provides plenty of moisture to help keep your pal hydrated and support urinary health. So open up the easy pull tab and turn mealtime into yum time.',
      quantity: 100,
      imageName: '11.png',
      foodForm: 'Wet Food',
      animal: 'Cat',
      lifeStage: 'Baby',
    }),
    Product.create({
      name: "Hill's Science Diet Adult Savory Salmon Entree Canned Cat Food",
      price: '17.50',
      description:
        "Hill's Science Diet Adult Savory Salmon Entree Canned Cat Food provides your four-legged friend with great tasting nutrition for a long, happy life. Made with wholesome ingredients such as savory salmon, this nourishing recipe is balanced to meet your pet's needs, help maintain an ideal body weight and is easy to digest. Manufactured in the United States, every ingredient meets strict requirements for purity and nutrient content which exceed industry standards. Formulated for adult cats from 1 to 6 years old, this Hill's Science Diet provides your cat the nutrition she needs for a lifetime of health and happiness.",
      quantity: 100,
      imageName: '12.png',
      foodForm: 'Wet Food',
      animal: 'Cat',
      lifeStage: 'Adult',
      isBestSeller: true,
    }),
    Product.create({
      name: 'Tiny Tiger Chunks in EXTRA Gravy Tuna Recipe Grain-Free Canned Cat Food',
      price: '18.50',
      description:
        "Feed your cat's biggest dreams with a bowlful of delicious, grain-free nutrition. Tiny Tiger Chunks in Extra Gravy recipes deliver the protein your mighty feline needs to perform at his best, with a variety of crave-able proteins—including real whitefish, salmon and tuna. It's a complete and balanced diet in every can, and a total showstopper when it comes to flavor and nutrition. Your cat will love the taste of real fish in savory gravy, and you can feel good knowing each bite packs the nutrients he needs to stay in tip-top shape, like vitamins, minerals and essential amino acids like taurine. Plus, there's real broth to add healthy hydration, and never any grains like corn, wheat or soy. Open up a can and feed the stripes within!",
      quantity: 100,
      imageName: '13.png',
      foodForm: 'Wet Food',
      animal: 'Cat',
      lifeStage: 'Senior',
      isBestSeller: true,
    }),
    Product.create({
      name: 'Meow Mix Original Choice Premium Protein & Nutrition Dry Adult Cat Food',
      price: '20.50',
      description:
        "Meow Mix Original Choice Dry Cat Food is specially formulated to help adult cats stay healthy and happy. To maintain wellness throughout adulthood, fully grown cats need the proper nutrition to keep them in top shape as they age. Meow Mix Original Choice provides all the essential nutrients they need, including high-quality protein and essential fatty acids to help support strong muscles and keep their coat looking its best. It's packed with tons of wholesome ingredients and the irresistible flavors of chicken, turkey, salmon and ocean fish. This tasty food is complete and balanced for adult cats with all the vitamins and minerals they need for optimal health.",
      quantity: 100,
      imageName: '14.png',
      foodForm: 'Dry Food',
      animal: 'Cat',
      lifeStage: 'Adult',
    }),
    Product.create({
      name: 'Iams ProActive Health Indoor Weight & Hairball Care Dry Cat Food',
      price: '32.25',
      description:
        'Great health starts with a great diet, so IAMS PROACTIVE HEALTH Adult Indoor Weight Control & Hairball Control Care Dry Cat Food with Chicken and Turkey Cat Kibble to bring out the best in your pet! This dry cat food is made with tasty chicken and turkey, packed into an irresistibly crunchy kibble. A special formula with healthy weight management in mind, this recipe is made with L-carnitine which helps burn fat and maintain a healthy metabolism. Plus, a fiber blend with beet pulp helps support healthy digestion and reduce hairballs, while omega acids promote a beautiful, healthy coat. Your cat will love this purr-fect blend of flavor and nutrients!',
      quantity: 100,
      imageName: '15.png',
      foodForm: 'Dry Food',
      animal: 'Cat',
      lifeStage: 'Baby',
    }),
    Product.create({
      name: 'Royal Canin Veterinary Premium Diet Adult Urinary SO Dry Cat Food',
      price: '45.25',
      description:
        "Royal Canin Urinary SO is a veterinary-exclusive dry cat food developed to nutritionally support your adult cat's urinary tract and bladder health. This formula promotes a urinary environment unfavorable to the formation of both struvite and calcium oxalate crystals. It increases the amount of urine your cat produces to help dilute excess minerals that can cause crystals and stones. Relative Super Saturation (RSS) methodology is used to help lower ion concentration in urine, which contributes to stone formation. And this specialized nutrition, with a reduced level of magnesium, helps dissolve pure struvite stones and prevent struvite stones from forming. Lower urinary tract issues may be a recurring concern for some cats. Talk to your veterinarian about keeping your cat on this urinary cat food for long-term urinary support.",
      quantity: 100,
      imageName: '16.png',
      foodForm: 'Dry Food',
      animal: 'Cat',
      lifeStage: 'Senior',
      isBestSeller: true,
    }),
    Product.create({
      name: 'American Journey Turkey & Chicken Recipe Grain-Free Dry Cat Food',
      price: '30.25',
      description:
        "With American Journey Poultry & Beef Variety Pack Grain-Free Canned Dog Food, your dog will get the nourishment he needs for any adventure the day might bring. Real meat starts off each recipe, followed by a savory broth to give dogs the tastes they crave plus high-quality protein to help them maintain lean muscles. These delicious loaf-style dinners are crafted in the USA with some of the world's finest ingredients from trusted sources. They're full of flavor but free of things like poultry by-product meal, grains, corn, wheat, soy and artificial colors, flavors and preservatives. You can count on these American Journey formulas to provide essential amino acids, plenty of omega fatty acids for skin and coat health, and added vitamins and minerals.",
      quantity: 100,
      imageName: '17.png',
      foodForm: 'Dry Food',
      animal: 'Cat',
      lifeStage: 'Adult',
    }),
    Product.create({
      name: 'Taste of the Wild High Prairie Grain-Free Chicken & Beef Dry Dog Food',
      price: '22.75',
      description:
        'Nourish your canine companion with the balanced diet nature intended with Taste of the Wild High Prairie Grain-Free Dry Dog Food! Formulated with novel proteins including buffalo and bison, this grain-free recipe includes peas and sweet potatoes that deliver the highly-digestible energy your active pup needs, along with natural antioxidant support from real fruits and vegetables and dried chicory root for prebiotic support and healthy digestion. Essential minerals are chelated with amino acids to optimize their absorption and ensure maximum benefit, for complete and balanced nutrition with a taste of the wild your furry friend constantly craves!',
      quantity: 100,
      imageName: '18.png',
      foodForm: 'Dry Food',
      animal: 'Dog',
      lifeStage: 'Baby',
    }),
  ]);
  /* ------- order testing data-------- */

  await prof.addToCart({ product: bazz, quantity: 3 });
  await prof.addToCart({ product: foo, quantity: 2 });
  await prof.addToCart({ product: foo, quantity: 2 });
  await prof.createOrder({ orderTotal: 193.76 });

  await prof.addToCart({ product: product5, quantity: 2 });
  await prof.createOrder({ orderTotal: 50.45 });

  await prof.addToCart({ product: bazz, quantity: 6 });
  await prof.createOrder({ orderTotal: 191.64 });

  await prof.addToCart({ product: product9, quantity: 4 });
  await prof.addToCart({ product: product13, quantity: 1 });
  await prof.createOrder({ orderTotal: 122.74 });

  /* -------end of order testing data-------- */

  await Promise.all([
    Rating.create({
      star: 5,
      comment: 'Nice',
      userId: moe.id,
      productId: bazz.id,
    }),
    Rating.create({
      star: 5,
      comment: 'My dog loves it',
      userId: nono.id,
      productId: bazz.id,
    }),
    Rating.create({
      star: 5,
      comment: 'I have two little guys. They both love it.',
      userId: max.id,
      productId: bazz.id,
    }),
    Rating.create({
      star: 3,
      comment: 'not bad',
      userId: moe.id,
      productId: bar.id,
    }),
    Rating.create({
      star: 3,
      comment: 'Could of been better',
      userId: luca.id,
      productId: foo.id,
    }),
    Rating.create({
      star: 5,
      comment: "My dog's favorite",
      userId: moe.id,
      productId: foo.id,
    }),
    Rating.create({
      star: 5,
      comment: 'Amazing',
      userId: max.id,
      productId: product1.id,
    }),
    Rating.create({
      star: 3,
      comment: 'Pet hated it, I had to mix chicken with it',
      userId: nono.id,
      productId: product2.id,
    }),
    Rating.create({
      star: 4,
      comment: 'Both my pets loved it, but it is pricy',
      userId: lok.id,
      productId: product3.id,
    }),
    Rating.create({
      star: 5,
      comment: 'Best purchase I ever did!',
      userId: prof.id,
      productId: product5.id,
    }),
    Rating.create({
      star: 3,
      userId: luca.id,
      productId: product6.id,
      comment: 'not bad',
    }),
    Rating.create({
      star: 4,
      userId: nono.id,
      productId: product7.id,
      comment: 'not bad',
    }),
    Rating.create({
      star: 5,
      comment: 'Very good product!',
      userId: max.id,
      productId: product8.id,
    }),
    Rating.create({
      star: 4,
      comment: 'Good, but expensive',
      userId: max.id,
      productId: product9.id,
    }),
    Rating.create({
      star: 5,
      comment: 'will definitely order more',
      userId: moe.id,
      productId: product10.id,
    }),
    Rating.create({
      star: 4,
      comment: 'My cat loves the taste of real fish',
      userId: nono.id,
      productId: product10.id,
    }),
    Rating.create({
      star: 5,
      userId: lok.id,
      productId: product11.id,
    }),
    Rating.create({
      star: 3,
      comment: 'Recommended by my friend, but my pet did not like it',
      userId: lok.id,
      productId: product12.id,
    }),
    Rating.create({
      star: 5,
      userId: luca.id,
      productId: product13.id,
      comment: 'very good brand. healthy food',
    }),
    Rating.create({
      star: 3,
      userId: prof.id,
      productId: product14.id,
      comment: 'not bad',
    }),
    Rating.create({
      star: 4,
      comment: 'Loved it!',
      userId: prof.id,
      productId: product15.id,
    }),
    Rating.create({
      star: 3,
      comment: 'Smelly product!',
      userId: prof.id,
      productId: product4.id,
    }),
    Rating.create({
      star: 4,
      userId: lok.id,
      productId: product6.id,
      comment: 'great service at Pet Foodie',
    }),
    Rating.create({
      star: 4,
      userId: max.id,
      productId: product13.id,
      comment: 'Veterinarian recommended',
    }),
    Rating.create({
      star: 5,
      comment: 'Amazing product!',
      userId: lok.id,
      productId: product12.id,
    }),
    Rating.create({
      star: 3,
      userId: max.id,
      productId: product3.id,
    }),
    Rating.create({
      star: 3,
      comment: 'Not the best product out there',
      userId: max.id,
      productId: product12.id,
    }),
    Rating.create({
      star: 4,
      comment: 'Nice varity pack. Good price.',
      userId: nono.id,
      productId: product1.id,
    }),
  ]);

  return {
    users: {
      moe,
      luca,
      max,
      nono,
      lok,
      prof,
    },
    products: {
      foo,
      bar,
      bazz,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
  Rating,
};
