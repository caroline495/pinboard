json.extract! @pin, :id, :creator_id, :description, :title, :link, :board_id
if @pin.image.attached?
    json.imageUrl url_for(@pin.image)
end