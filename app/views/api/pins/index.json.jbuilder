@pins.each do |pin|
    json.set! pin.id do
        json.extract! pin, :id, :creator_id, :description, :title, :link
    end
end