class Board < ApplicationRecord

    validates :name, :creator_id, presence: true
    validates :private_mode, inclusion: { in: [true, false], message: 'must be true or false' }

    belongs_to :creator,
        class_name: :User

    has_many :pins,
        foreign_key: :board_id,
        dependent: :destroy,
        inverse_of: :board

end
