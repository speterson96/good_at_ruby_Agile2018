# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

scores = Score.create([{user_id: 1, score: 20}, {user_id: 1, score: 10}, {user_id: 2, score: 30}, {user_id: 3, score: 50}, {user_id: 1, score: 60}, {user_id: 4, score: 70}, {user_id: 6, score: 80}, {user_id: 1, score: 90}, {user_id: 1, score: 100}, {user_id: 1, score: 101}])
users = User.create([{name: 'Jessie'}, {name: 'Alex'}, {name: 'Bee'}, {name: 'Sam'}, {name: 'Derik'}, {name: 'Benjamin'}])
