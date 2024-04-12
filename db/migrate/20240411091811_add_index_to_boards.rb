class AddIndexToBoards < ActiveRecord::Migration[7.1]
  def change
    add_index :boards, [:creator_id, :name], unique: true
  end
end
