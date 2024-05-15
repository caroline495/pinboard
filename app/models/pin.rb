class Pin < ApplicationRecord
    
    # validate :require_image
    # validates :creator_id, presence: true
    validates :board_id, presence: {message: 'Please select a board for your pin'}
    # validates :board_id, allow_nil: true
    has_one_attached :image # all you need to allow pin to have photo attached
    # has_many_attached :photos // if you want to have many photos attached
    # we are not storing any information in pin table at all - activestorage handles it
    
    belongs_to :creator,
        class_name: :User

    belongs_to :board,
        class_name: :Board
        
    def require_image
        unless image.attached?
            errors.add(:image, "You must upload an image")
        end
    end
end
