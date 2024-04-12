class Api::BoardsController < ApplicationController

    def index 
        @boards = Board.all
        render :index
    end

    def show
        @board = Board.find_by(id: params[:id])
        @pins = Pin.where(board_id: @board.id)
        if @board
            render :show 
        else
            render json: 'Board not found', status: :not_found
        end

    end

    def create
        @board = Board.new(board_params)
        @pins = {}

        if @board.save
            render :show
        else
            render json: @board.errors.full_messages, status: 422
        end

    end

    def update
        @board = Board.find_by(id: params[:id])
        if @board && @board.update(board_params)
            render :show
        else
            if @board
                render json: @board.errors.full_messages, status: 422
            else
                render json: ['No board found'], status: 404
            end
        end
    end

    def destroy
        @board = Board.find_by(id: params[:id])
        @board.destroy
        head :no_content # creates a http status code 204 with an empty body
    end

    private

    def board_params
        params.require(:board).permit(:id, :creator_id, :description, :name, :private_mode, :pins)
    end


end
