class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.boolean :is_complete
      t.belongs_to :project, index: true, foreign_key: true
      t.integer :index

      t.timestamps null: false
    end
  end
end
