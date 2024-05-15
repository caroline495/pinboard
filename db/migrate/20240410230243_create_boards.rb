class CreateBoards < ActiveRecord::Migration[7.1]
  def change
    create_table :boards do |t|
      t.references :creator, null: false, foreign_key: {to_table: :users}  
      t.text :description
      t.string :name, null: false
      t.boolean :private, null: false
      t.timestamps
    end
  end
end
