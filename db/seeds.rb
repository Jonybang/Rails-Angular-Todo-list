# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

projects = Project.create([
                            {
                                name: 'Учеба',
                                tasks: Task.create([{name: 'Доделать курсач', index: 0}, {name: 'Доделать диплом', index: 1}])
                            },
                            {
                                name: 'Работа',
                                tasks: Task.create([{name: 'Найти работу', index: 0}, {name: 'Начать работать', index: 1}])
                            },
                            {
                                name: 'Личное',
                                tasks: Task.create([{name: 'Придумать что-нибудь личное', index: 0}, {name: 'Написать что-нибудь личное в to-do лист', index: 1}])
                            }])