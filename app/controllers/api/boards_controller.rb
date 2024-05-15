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
            # Original: just displayed an array of the error message (only one error message)
            # render json: @board.errors.full_messages, status: 422

            # When we write it like this, what is produced is an object with a key of errors that has an array of the error messages as its value
            render json: { errors: @board.errors.full_messages }, status: 422
        end

    end

    def update
        @board = Board.find_by(id: params[:id])
        if @board && @board.update(board_params)
            render :show
        else
            if @board
                # updated this to just @board.errors so could show custom message for unique scope without "name" in front
                render json: { errors: @board.errors }, status: 422
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
