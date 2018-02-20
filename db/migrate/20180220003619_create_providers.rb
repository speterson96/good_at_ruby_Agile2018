class CreateProviders < ActiveRecord::Migration
  def change
    create_table :providers do |t|
      t.string :name
      t.integer :uid
      t.timestamps null: false
    end
    add_foreign_key :providers, :users
  end
end
