class AddBoardidToPins < ActiveRecord::Migration[7.1]
  def change
    add_reference :pins, :board, foreign_key: {to_table: :boards}
  end
end
