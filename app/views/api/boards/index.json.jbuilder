@boards.each do |board|
    json.set! board.id do
        json.extract! board, :id, :creator_id, :description, :name, :private
    end
end