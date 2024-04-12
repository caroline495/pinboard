class RemoveIndexFromBoards < ActiveRecord::Migration[7.1]
  def change
    remove_index :boards, :creator_id
  end
end
