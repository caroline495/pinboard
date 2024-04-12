class ChangeNameInBoards < ActiveRecord::Migration[7.1]
  def change
    rename_column :boards, :private, :private_mode
  end
end
