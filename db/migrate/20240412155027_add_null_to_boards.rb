class AddNullToBoards < ActiveRecord::Migration[7.1]
  def change
    change_column_null :pins, :board_id, true
  end
end
