class CreatePins < ActiveRecord::Migration[7.1]
  def change
    create_table :pins do |t|
      t.references :creator, null: false, foreign_key: {to_table: :users}  
      t.text :description
      t.string :title
      t.text :link
      t.timestamps
    end
  end
end
