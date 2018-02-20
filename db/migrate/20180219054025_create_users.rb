class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :user_id # Possible Remove this line
      t.string :user_name
      t.integer :provider_uid
      t.string :provider_name
    end
    add_index :users, :user_id
  end
end
