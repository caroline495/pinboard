class Pin < ApplicationRecord

    has_one_attached :image # all you need to allow pin to have photo attached
    # has_many_attached :photos // if you want to have many photos attached
    # we are not storing any information in pin table at all - activestorage handles it

    belongs_to :creator,
        class_name: :User

end
