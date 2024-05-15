json.board do 
    json.extract! @board, :id, :creator_id, :description, :name, :private_mode
end
if @pins
    json.pins do
        @pins.each do |pin|
            json.set! pin.id do
                json.extract! pin, :id, :creator_id, :description, :title, :link, :board_id
                if pin.image.attached?
                    json.imageUrl url_for(pin.image)
                end
            end
        end
    end
else 
    json.pins @pins
end