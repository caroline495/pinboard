class Api::PinsController < ApplicationController

    def index 
        @pins = Pin.all
        render :index
    end

    def show
        @pin = Pin.find_by(id: params[:id])
        if @pin
            render :show 
        else
            render json: 'Pin not found', status: :not_found
        end

    end

    def create
        @pin = Pin.new(pin_params)

        if @pin.save
            render :show
        else
            error_hash = @pin.errors.group_by_attribute.transform_values { |errors| errors.map(&:message) }
            render json: { errors: error_hash }, status: :unprocessable_entity # status 422 too
            # render json: {errors: @pin.errors.full_messages}, status: 422
        end

    end

    def update
        @pin = Pin.find_by(id: params[:id])
        if @pin && @pin.update(pin_params)
            render :show
        else
            if @pin
                render json: @pin.errors.full_messages, status: 422
            else
                render json: ['No pin found'], status: 404
            end
        end
    end

    def destroy
        @pin = Pin.find_by(id: params[:id])
        @pin.destroy
        head :no_content # creates a http status code 204 with an empty body
    end

    private

    def pin_params
        params.require(:pin).permit(:id, :creator_id, :description, :title, :link, :image, :board_id, :imageUrl)
    end

end
