# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'open-uri'

ApplicationRecord.transaction do 
    # puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Pin.destroy_all
  
    # puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('pins')
  
    # puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    user1 = User.create!(username: 'Demo-lition', email: 'demo@user.io', password: 'password')
    user2 = User.create!(username: 'green_yogi', email: 'greenyogi@user.io', password: 'password')
    user3 = User.create!(username: 'testUser7', email: 'testuser7@user.io', password: 'password')
  
    board1 = Board.create!(creator_id: user3.id, description: 'healthy and delicious', name: 'mediterranean inspired foods', private_mode: true)
    board2 = Board.create!(creator_id: user1.id, description: 'ilnp spring collection', name: 'ILNP spring', private_mode: false)
    board3 = Board.create!(creator_id: user3.id, description: 'sanrio lovers unite!', name: 'hello kitty', private_mode: false)
    board4 = Board.create!(creator_id: user3.id, description: 'brrr in Canada', name: 'Whistler', private_mode: false)
    board5 = Board.create!(creator_id: user3.id, description: "uncle iroh's tea shop", name: 'tea', private_mode: false)
    board6 = Board.create!(creator_id: user3.id, description: '', name: 'desserts', private_mode: true)
    board7 = Board.create!(creator_id: user3.id, description: '', name: 'coffee', private_mode: false)

    pin1 = Pin.create!(creator_id: user1.id, description: 'testing', title: 'testing', link: "testing");

    pin2 = Pin.create!(creator_id: user3.id, description: 'Nectarine summer salad', title: 'Nectarine summer salad', link: 'https://honestlyyum.com/11034/summer-nectarine-salad/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/nectarine_summer_salad.jpg')
    pin2.image.attach(io: file, filename: 'nectarine_summer_salad.jpg');

    pin3 = Pin.create!(creator_id: user2.id, description: 'flan recipe', title: 'Creamy caramel flan', link: 'https://www.tasteofhome.com/recipes/creamy-caramel-flan/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/caramel_flan.jpg')
    pin3.image.attach(io: file, filename: 'caramel_flan.jpg');
    
    pin4 = Pin.create!(creator_id: user2.id, description: 'caramel lattes for the fall', title: 'Caramel latte recipe', link: 'https://bakingmischief.com/easy-caramel-latte/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/easy_caramel_latte.jpg')
    pin4.image.attach(io: file, filename: 'easy_caramel_latte.jpg');

    pin5 = Pin.create!(creator_id: user3.id, description: 'mediterranean orzo salad recipe', title: 'Greek Orzo with Tomatoes, Olives, Basil, and Feta', link: 'https://juliasalbum.com/orzo-tomatoes-feta/', board_id: board1.id);
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/greek_orzo_tomatoes_feta.jpg')
    pin5.image.attach(io: file, filename: 'greek_orzo_tomatoes_feta.jpg');

    pin6 = Pin.create!(creator_id: user3.id, description: 'Ever craved the crazy feta dip from Cava? Well now you can make it at home', title: 'Crazy Feta Dip - CAVA Copycat', link: 'https://moribyan.com/crazy-feta-dip-cava-copycat/', board_id: board1.id);
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/crazy_feta_dip_cava_copycat.jpg')
    pin6.image.attach(io: file, filename: 'crazy_feta_dip_cava_copycat.jpg');

    pin7 = Pin.create!(creator_id: user3.id, description: '', title: 'Greek Chicken Meatballs', link: 'https://allthehealthythings.com/greek-chicken-meatballs/', board_id: board1.id);
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/greek_chicken_meatball_bowls.jpg')
    pin7.image.attach(io: file, filename: 'greek_chicken_meatball_bowls.jpg');

    pin8 = Pin.create!(creator_id: user3.id, description: 'Love matcha and yuzu together...and combine it with gin!', title: 'Matcha Yuzu Gin Fizz', link: 'https://www.siftandsimmer.com/matcha-yuzu-gin-fizz/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/matcha_yuzu_gin_fizz.jpg')
    pin8.image.attach(io: file, filename: 'matcha_yuzu_gin_fizz.jpg');

    pin9 = Pin.create!(creator_id: user3.id, description: '', title: 'Greek salad', link: 'https://downshiftology.com/recipes/greek-salad/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/best_greek_salad.jpg')
    pin9.image.attach(io: file, filename: 'best_greek_salad.jpg');

    pin10 = Pin.create!(creator_id: user3.id, description: 'Vanilla lavender syrup to make lavender lattes!', title: 'Vanilla Lavender Syrup', link: 'https://www.lifewithtuyen.com/post/vanilla-lavender-syrup');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/vanilla_lavender_syrup.jpg', board_id: board7.id)
    pin10.image.attach(io: file, filename: 'vanilla_lavender_syrup.jpg');

    pin11 = Pin.create!(creator_id: user3.id, description: 'celebrate spring with blackberry lavender scones', title: 'Blackberry Lavender White Chocolate Scones', link: 'https://www.halfbakedharvest.com/blackberry-lavender-white-chocolate-scones/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/blackberry_lavender_white_chocolate_scones.jpg')
    pin11.image.attach(io: file, filename: 'blackberry_lavender_white_chocolate_scones.jpg');

    pin12 = Pin.create!(creator_id: user3.id, description: 'Lemon garlic baked chicken thighs - a delicious and simple main dish', title: 'Lemon Garlic Baked Chicken Thighs', link: 'https://www.eatwell101.com/garlic-lemon-baked-chicken-thighs-recipe');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/lemon_garlic_baked_chicken_thighs.jpg')
    pin12.image.attach(io: file, filename: 'lemon_garlic_baked_chicken_thighs.jpg');

    pin13 = Pin.create!(creator_id: user3.id, description: 'Delicious Thai dessert combining coconut rice + mango...', title: 'Mango Sticky Rice', link: 'https://elavegan.com/mango-sticky-rice-recipe/', board_id: board6.id);
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/mango_sticky_rice.jpg')
    pin13.image.attach(io: file, filename: 'mango_sticky_rice.jpg');

    pin14 = Pin.create!(creator_id: user3.id, description: 'matcha jasmine cake with yuzu curd', title: 'Matcha Jasmine Cake with Yuzu Curd', link: 'https://www.siftandsimmer.com/matcha-jasmine-cake-with-yuzu-curd/', board_id: board6.id);
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/matcha_jasmine_cake.jpg')
    pin14.image.attach(io: file, filename: 'matcha_jasmine_cake.jpg');

    pin15 = Pin.create!(creator_id: user2.id, description: '', title: 'Salted caramel chocolate chip cookie bars', link: 'https://thatovenfeelin.com/salted-caramel-chocolate-chip-cookie-bars');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/salted_caramel_chocolate_chip_cookie_bars.jpg')
    pin15.image.attach(io: file, filename: 'salted_caramel_chocolate_chip_cookie_bars.jpg');

    pin16 = Pin.create!(creator_id: user2.id, description: 'California casual kitchen', title: 'california casual kitchen', link: 'https://thehavenlist.com/this-warm-minimalist-kitchen-is-california-casual-at-its-finest/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/california_casual_kitchen.jpg')
    pin16.image.attach(io: file, filename: 'california_casual_kitchen.jpg');

    pin17 = Pin.create!(creator_id: user2.id, description: 'Camillestyles.com: Lauren Conrad’s Home Is the Definition of California Cool', title: 'california cool home', link: 'https://camillestyles.com/design/lauren-conrads-home-is-the-definition-of-california-cool/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/california_lauren_conrad_hallway.jpg')
    pin17.image.attach(io: file, filename: 'california_lauren_conrad_hallway.jpg');

    pin18 = Pin.create!(creator_id: user2.id, description: 'Is This The New “California Casual”? Step Inside This Modern Double A Frame Home That Is Contemporary AND Dripping With Soul', title: 'Is This The New “California Casual”? Step Inside This Modern Double A Frame Home That Is Contemporary AND Dripping With Soul', link: 'https://stylebyemilyhenderson.com/blog/the-new-california-casual-modern-double-a-frame-home-tour');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/california_upstairs_hallway.jpg')
    pin18.image.attach(io: file, filename: 'california_upstairs_hallway.jpg');

    pin19 = Pin.create!(creator_id: user2.id, description: '41 Coastal Living Room Design Ideas You Havent Seen Before: Image 34 / 41', title: '41 Coastal Living Room Design Ideas', link: 'https://edwardgeorgelondon.com/en-usa/blogs/home-garden/coastal-living-room-design-ideas');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/coastal_decor_living_room.jpg')
    pin19.image.attach(io: file, filename: 'coastal_decor_living_room.jpg');

    pin20 = Pin.create!(creator_id: user2.id, description: 'modern coastal home with neutral palette', title: 'Modern coastal home', link: 'https://www.homestolove.com.au/home-tours/modern-coastal-home-with-neutral-palette-21808/');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/coastal_home_banquette.jpg')
    pin20.image.attach(io: file, filename: 'coastal_decor_living_room.jpg');

    pin21 = Pin.create!(creator_id: user2.id, description: 'From crate and barrel: tate dining table', title: 'modern dining room', link: 'https://www.crateandbarrel.com/tate-78-114-walnut-extendable-mid-century-dining-table/s683452');
    file = URI.open('https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/crate_and_barrel_tate_dining_table.jpg')
    pin21.image.attach(io: file, filename: 'coastal_decor_living_room.jpg');
    
    
    
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end
  
  end